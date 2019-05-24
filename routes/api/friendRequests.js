const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Form Validation
//PUT THAT SHIT HERE

// Load FriendRequestModel
const FriendRequest = require("../../models/FriendRequest");

// @route POST api/trips/add
// @desc Create a new Trip
// @access Public
router.post("/add", (req, res) => {
  //Form Validation
  //@TODO PUT THAT SHIT HERE

  //MAKE SURE THERE IS NOT CURRENTLY A RELATIONSHIP BETWEEN THE TWO HERE!!!

  const newFriendRequest = new FriendRequest({
    requester: req.body.requester,
    recipient: req.body.recipient,
    status: req.body.status
  });

  newFriendRequest.save()
    .then(friendRequest => {
      res.json(friendRequest);
    })
    .catch(err => console.log(err));
});


router.get("/:user", (req,res) => {
  FriendRequest.find({"recipient": req.params.user})
    .populate("requester", "name username profilePicLink")
    .then((requests) => {
      res.json(requests);
    })
})

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
  FriendRequest.findByIdAndUpdate(req.params.id, req.body, (err, friendRequest) => {
    if (err) return next(err);
    res.json(friendRequest);
  });
});

// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access public
router.delete("/:id", (req, res) => {
  FriendRequest.findById(req.params.id)
    .then(FriendRequest => FriendRequest.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
