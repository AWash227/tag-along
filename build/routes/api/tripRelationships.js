"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const Trip_1 = require("../../models/Trip");
const User_1 = require("../../models/User");
const TripRelationship_1 = require("../../models/TripRelationship");
router.post("/add", (req, res) => {
    const newTripRelationship = new TripRelationship_1.default({
        trip: req.body.trip,
        requester: req.body.requester,
        recipient: req.body.recipient,
        status: req.body.status
    });
    newTripRelationship
        .save()
        .then(tripRelationship => {
        res.json(tripRelationship);
    })
        .catch(err => console.log(err));
});
router.get("/:triprequest/accept", (req, res) => {
    TripRelationship_1.default.findById(req.params.triprequest).then((tripRequest) => {
        if (tripRequest && tripRequest.requester) {
            User_1.default.findById(tripRequest.requester).then(user => {
                if (user && user.joinedTrips) {
                    user.joinedTrips.push(tripRequest.trip);
                    user.save(user2 => {
                        console.log(`Updated ${user2.name}'s "JoinedTrips"`, user2.joinedTrips);
                        res.json("Added trip to user's 'JoinedTrips'");
                    });
                }
            });
        }
    });
    res.json("Trip could not be added to user's 'JoinedTrips'");
});
router.get("/:user", (req, res) => {
    TripRelationship_1.default.find({ recipient: req.params.user })
        .populate("requester", "name username profilePicLink")
        .populate("trip", "destination")
        .then(requests => {
        res.json(requests);
    });
});
router.get("/:trip", (req, res) => {
    TripRelationship_1.default.find({ trip: req.params.trip })
        .then(tripRels => {
        res.json(tripRels);
    })
        .catch(err => {
        res.json(err);
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
    TripRelationship_1.default.findByIdAndUpdate(req.params.id, req.body, (err, relationship) => {
        if (!err) {
            res.json(relationship);
        }
    });
});
router.delete("/:id", (req, res) => {
    TripRelationship_1.default.findById(req.params.id)
        .then(TripRelationship => {
        if (TripRelationship) {
            TripRelationship.remove().then(() => res.json({ success: true }));
        }
    })
        .catch(err => res.status(404).json({ success: false }));
});
exports.default = router;
//# sourceMappingURL=tripRelationships.js.map