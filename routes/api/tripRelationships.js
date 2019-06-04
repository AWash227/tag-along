const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Form Validation
//PUT THAT SHIT HERE

// Load Trip Relationship Model
const TripRelationship = require("../../models/TripRelationship");

// @route POST api/trips/add
// @desc Create a new Trip
// @access Public
router.post("/add", (req, res) => {
  //Form Validation
  //@TODO PUT THAT SHIT HERE

  //MAKE SURE THERE IS NOT CURRENTLY A RELATIONSHIP BETWEEN THE TWO HERE!!!

  const newTripRelationship = new TripRelationship({
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

// @desc Find all tripRelationships that the requester has
router.get("/:user", (req, res) => {
  TripRelationship.find({ recipient: req.params.user })
    .populate("requester", "name username profilePicLink")
    .populate("trip", "destination")
    .then(requests => {
      res.json(requests);
    });
});

// @desc Find all tripRelationships for a specific trip
router.get("/:trip", (req, res) => {
  TripRelationship.find({ trip: req.params.trip })
    .then(tripRels => {
      res.json(tripRels);
    })
    .catch(err => {
      res.json(err);
    });
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
  TripRelationship.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, relationship) => {
      if (err) return next(err);
      res.json(relationship);
    }
  );
});

// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access public
router.delete("/:id", (req, res) => {
  TripRelationship.findById(req.params.id)
    .then(TripRelationship =>
      TripRelationship.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
