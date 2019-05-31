const express = require("express");
const router = express.Router();
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

// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access public
router.delete("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .then(Trip => Trip.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
