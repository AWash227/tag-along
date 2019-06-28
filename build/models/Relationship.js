"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("./User");
mongoose.model("users");
const RelationshipSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        unique: true,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    status: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    }
});
const Relationship = mongoose.model("relationships", RelationshipSchema);
exports.default = Relationship;
//# sourceMappingURL=Relationship.js.map