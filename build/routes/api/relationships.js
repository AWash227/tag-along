"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const Trip_1 = require("../../models/Trip");
const Relationship_1 = require("../../models/Relationship");
router.post("/add", (req, res) => {
    const newRelationship = new Relationship_1.default({
        requester: req.body.requester,
        recipient: req.body.recipient,
        status: req.body.status
    });
    newRelationship
        .save()
        .then(relationship => {
        res.json(relationship);
    })
        .catch(err => console.log(err));
});
router.get("/:id", (req, res) => {
    Relationship_1.default.find({ recipient: req.params.id })
        .populate("requester", "name username profilePicLink")
        .then(requests => {
        res.json(requests);
    });
});
router.get("/:id", (req, res) => {
    Trip_1.default.findById(req.params.id)
        .then(Trip => {
        res.json(Trip);
    })
        .catch(err => {
        console.log(err);
    });
});
router.patch("/:id", (req, res) => {
    Relationship_1.default.findByIdAndUpdate(req.params.id, req.body, (err, relationship) => {
        if (!err) {
            res.json(relationship);
        }
    });
});
router.delete("/:id", (req, res) => {
    Relationship_1.default.findById(req.params.id)
        .then(Relationship => {
        if (Relationship) {
            Relationship.remove().then(() => res.json({ success: true }));
        }
    })
        .catch(err => res.status(404).json({ success: false }));
});
exports.default = router;
//# sourceMappingURL=relationships.js.map