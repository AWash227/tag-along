"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys_1 = require("../../config/keys");
const mongoose = require("mongoose");
const register_1 = require("../../validation/register");
const login_1 = require("../../validation/login");
const User_1 = require("../../models/User");
const Trip_1 = require("../../models/Trip");
function eliminateDuplicates(arr) {
    var i, len = arr.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
}
function fetchTripsFromArray(tripIds, hasFriends) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let tripsarr = [];
        if (hasFriends) {
            const objectifiedTripIds = tripIds.map(trip => {
                if (trip) {
                    return mongoose.Types.ObjectId(trip);
                }
                else if (!trip || trip == null) {
                    return;
                }
            });
            const tripsArr = yield Trip_1.default.find({ _id: { $in: objectifiedTripIds } })
                .populate("owner", "id name username profilePicLink")
                .then(trips => {
                return trips;
            });
            return tripsArr;
        }
        else {
            return [];
        }
    });
}
router.post("/register", (req, res) => {
    const { errors, isValid } = register_1.validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User_1.default.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        const newUser = new User_1.default({
            name: req.body.name,
            username: req.body.username,
            profilePicLink: req.body.profilePicLink,
            email: req.body.email,
            password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err)
                    throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
});
router.get("/trips/:id", (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let tripsIdsBD = [];
    let sortedTrips = [];
    let tripsIds = [];
    let hasFriends = false;
    let hasTrips = false;
    User_1.default.findById(req.params.id)
        .populate("friends", "trips")
        .then(user => {
        if (!user || !user.friends) {
            hasFriends = false;
        }
        else {
            hasFriends = true;
            user.friends.forEach((friend) => {
                if (friend != undefined && friend.trips != undefined) {
                    friend.trips.forEach(trip => {
                        tripsIdsBD.push(trip);
                    });
                }
            });
            sortedTrips = tripsIdsBD.slice().sort();
            tripsIds = eliminateDuplicates(sortedTrips);
            if (tripsIds) {
                hasTrips = true;
            }
            else {
                hasTrips = false;
            }
        }
        if (hasFriends) {
            const trips = fetchTripsFromArray(tripsIds, hasFriends);
            trips
                .then(trips => {
                res.json(trips);
                return trips;
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            res.json("Has no Trips");
        }
    })
        .catch(err => {
        res.json(err);
    });
}));
router.get("/trips/owned/:id", (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    User_1.default.findById(req.params.id)
        .populate("trips", "destination active")
        .then(user => {
        if (user) {
            res.json(user.trips);
        }
    });
}));
router.get("/", (req, res) => {
    User_1.default.find().then(users => res.json(users));
});
router.get("/id/:id", (req, res) => {
    User_1.default.findById(req.params.id, (err, user) => {
        if (!err) {
            res.json(user);
        }
        else {
            console.log(err);
        }
    });
});
router.get("/:username", (req, res) => {
    User_1.default.findOne({ username: req.params.username }, (err, user) => {
        if (!err) {
            res.json(user);
        }
        else {
            console.error(err);
        }
    });
});
router.post("/login", (req, res) => {
    const { errors, isValid } = login_1.validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User_1.default.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    profilePicLink: user.profilePicLink,
                    trips: user.trips,
                    joinedTrips: user.joinedTrips,
                    friends: user.friends
                };
                jwt.sign(payload, keys_1.default.secretOrKey, {
                    expiresIn: 31556926
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            }
            else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
router.delete("/:id", (req, res) => {
    User_1.default.findById(req.params.id)
        .then(User => {
        if (User) {
            User.remove().then(() => res.json({ success: true }));
        }
    })
        .catch(err => res.status(404).json({ success: false }));
});
router.patch("/id/:id", (req, res) => {
    User_1.default.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (!err) {
            res.json(user);
        }
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map