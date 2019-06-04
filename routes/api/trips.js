const express = require("express");
const router = express.Router();
const passportstrat = require("../../config/passport");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../../config/keys");

//Load Form Validation
//PUT THAT SHIT HERE

//Load Trip Model
const Trip = require("../../models/Trip");
const User = require("../../models/User");

// @route POST api/trips/add
// @desc Create a new Trip
// @access Public
router.post("/add", (req, res) => {
  //Form Validation
  //@TODO PUT THAT SHIT HERE

  const newTrip = new Trip({
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
      User.findById(trip.owner).then(user => {
        console.log(user);
        user.trips.push(trip);
        user.save(user => {
          console.log(user);
        });
      });
      res.json(trip);
    })
    .catch(err => console.log(err));
});

// @route GET api/trips/
// @desc Get all trips
// @access public
router.get("/", (req, res) => {
  Trip.find()
    .populate("owner")
    .then(trips => res.json(trips));
});

// @route GET api/trips/:id
// @desc Get one specific trip
// @access public
router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .populate("owner", "username name profilePicLink")
    .populate("joined", "name profilePicLink")
    .then(Trip => {
      res.json(Trip);
    })
    .catch(err => {
      console.log(err);
    });
});

// @route PATCH api/trips/:id
// @desc update specific trip
// @access public
router.patch("/:id", (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, (err, trip) => {
    if (err) return next(err);
    res.json(trip);
  });
});

// @route PATCH api/trips/join/:id
// @desc Add user to joined array for specific trip
// @access public (for now)
router.patch("/join/:id", (req, res) => {
  console.log("USER SENT IS: ", req.body.user);
  Trip.findById(req.params.id)
    .then(trip => {
      console.log("USER SENT IS: ", req.body.user);
      trip.joined.push(req.body.user);
      trip
        .save()
        .then(trip1 => {
          res.json(trip1);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});
// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access delete
router.delete("/:id", passport.authenticate("jwt"), (req, res) => {
  Trip.findById(req.params.id)
    .then(trip => {
      console.log("user_id: ", req.user.id);
      console.log("trip_id: ", trip.owner);
      if (req.user.id == trip.owner) {
        trip
          .remove()
          .then(() =>
            res.json({ success: true, destination: trip.destination })
          );
      } else {
        console.log("USER DOES NOT OWN THIS TRIP");
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
