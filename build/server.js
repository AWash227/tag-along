"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const keys_1 = require("./config/keys");
const users_1 = require("./routes/api/users");
const trips_1 = require("./routes/api/trips");
const relationships_1 = require("./routes/api/relationships");
const tripRelationships_1 = require("./routes/api/tripRelationships");
const passport_1 = require("./config/passport");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
mongoose
    .connect(keys_1.default.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));
app.use(passport.initialize());
passport_1.configurePass(passport);
app.use("/api/users/", users_1.default);
app.use("/api/trips/", trips_1.default);
app.use("/api/relationships/", relationships_1.default);
app.use("/api/tripRelationships/", tripRelationships_1.default);
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.listen(port, "0.0.0.0", () => console.log("Server is running on port " + port + "."));
//# sourceMappingURL=server.js.map