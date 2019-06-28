import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as cors from "cors";
import keys from "./config/keys";

import users from "./routes/api/users";
import trips from "./routes/api/trips";
import relationships from "./routes/api/relationships";
import tripRelationships from "./routes/api/tripRelationships";
import { configurePass } from "./config/passport";

const app = express();

app.use(cors());

//BodyParser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
configurePass(passport);

//Routes
app.use("/api/users/", users);
app.use("/api/trips/", trips);
app.use("/api/relationships/", relationships);
app.use("/api/tripRelationships/", tripRelationships);

//Setup port and get server to listen
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.listen(port, "0.0.0.0", () =>
  console.log("Server is running on port " + port + ".")
);
