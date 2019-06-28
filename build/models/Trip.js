"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.model("users");
const TripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
        default: "Second Location"
    },
    seats: {
        type: Number,
        default: 0,
        required: true
    },
    donation: {
        type: Number,
        default: "0",
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    joined: [
        { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});
const Trip = mongoose.model("trips", TripSchema);
exports.default = Trip;
//# sourceMappingURL=Trip.js.map