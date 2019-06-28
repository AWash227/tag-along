import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as mongoose from "mongoose";
const User = mongoose.model("users");
import keys from "./keys";
import { PassportStatic } from "passport";

interface Iopts {
  jwtFromRequest: Strategy;
  secretOrKey: string;
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

export function configurePass(passport: PassportStatic) {
  passport.serializeUser((user: any, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done: any) => {
    done(null, user);
  });

  // Sign in using authentication token
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}
