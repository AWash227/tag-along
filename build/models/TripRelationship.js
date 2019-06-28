"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("./User");
require("./Trip");
mongoose.model("trips");
mongoose.model("users");
const TripRelationshipSchema = new mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trips",
        required: true
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3],
        required: true
    }
});
const TripRelationship = mongoose.model("tripRelationships", TripRelationshipSchema);
exports.default = TripRelationship;
//# sourceMappingURL=TripRelationship.js.map