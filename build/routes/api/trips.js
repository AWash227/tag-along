"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Trip_1 = require("../../models/Trip");
const User_1 = require("../../models/User");
router.post("/add", (req, res) => {
    const newTrip = new Trip_1.default({
        destination: req.body.destination,
        seats: req.body.seats,
        donation: req.body.donation,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        viewable_by: req.body.viewable_by,
        owner: req.body.owner
    });
    newTrip
        .save()
        .then(trip => {
        User_1.default.findById(trip.owner).then((user) => {
            if (user != undefined && user.trips != undefined) {
                user.trips.push(trip._id);
                user.save(user => {
                    console.log(user);
                });
            }
        });
        res.json(trip);
    })
        .catch(err => console.log(err));
});
router.get("/", (req, res) => {
    Trip_1.default.find()
        .populate("owner")
        .then(trips => res.json(trips));
});
router.get("/:id", (req, res) => {
    Trip_1.default.findById(req.params.id)
        .populate("owner", "username name profilePicLink")
        .populate("joined", "name profilePicLink")
        .then(Trip => {
        res.json(Trip);
    })
        .catch(err => {
        console.log(err);
    });
});
router.patch("/:id", (req, res) => {
    Trip_1.default.findByIdAndUpdate(req.params.id, req.body, (err, trip) => {
        if (!err) {
            res.json(trip);
        }
    });
});
router.patch("/join/:id", (req, res) => {
    console.log("USER SENT IS: ", req.body.user);
    Trip_1.default.findById(req.params.id)
        .then((trip) => {
        if (trip) {
            trip.joined.push(req.body.user);
            trip
                .save()
                .then(trip1 => {
                res.json(trip1);
            })
                .catch(err => {
                res.json(err);
            });
        }
        else {
            res.json("Trip does not exist!");
        }
    })
        .catch(err => {
        res.json(err);
    });
});
router.delete("/:id", passport.authenticate("jwt"), (req, res) => {
    Trip_1.default.findById(req.params.id)
        .then((trip) => {
        if (trip) {
            if (req.user.id == trip.owner) {
                trip
                    .remove()
                    .then(() => res.json({ success: true, destination: trip.destination }));
            }
            else {
                console.log("USER DOES NOT OWN THIS TRIP");
            }
        }
        else {
            res.json("Trip does not exist!");
        }
    })
        .catch(() => res.status(404).json({ success: false }));
});
exports.default = router;
//# sourceMappingURL=trips.js.map