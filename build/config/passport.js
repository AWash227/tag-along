"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys_1 = require("./keys");
const opts = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys_1.default.secretOrKey
};
function configurePass(passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(err => console.log(err));
    }));
}
exports.configurePass = configurePass;
//# sourceMappingURL=passport.js.map