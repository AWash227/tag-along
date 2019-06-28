"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicLink: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    joinedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }],
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }]
});
const User = mongoose.model("users", exports.UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map