const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const mongoose = require("mongoose");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");
const Trip = require("../../models/Trip");

// @route POST api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {
  // Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      profilePicLink: req.body.profilePicLink,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password before saving in Database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route GET api/users/trips
// @desc Get all of the trips of the friends of the user
// @access Public
router.get("/trips/:id", async (req, res) => {
  let tripsIds = [];
  User.findById(req.params.id)
    .populate("friends", "trips")
    .then(user => {
      // Map over the user's friends
      user.friends.forEach(friend => {
        // Add all of the trips for each friend

        tripsIds.push(friend.trips.toString());
      });

      // TODO Removes all matching elements
      const trips = fetchTripsFromArray(tripsIds);
      trips.then(trips => {
        console.log("Trips is: ", trips);
        res.json(trips);
        return trips;
      });
      // Log the trips
    })
    .catch(err => {
      res.json(err);
    });
});

// Takes in array of trip ids, and returns array of trips that are populated
async function fetchTripsFromArray(tripIds) {
  let tripsarr = [];
  // convert array to objectids
  const objectifiedTripIds = tripIds.map(trip => {
    return mongoose.Types.ObjectId(trip);
  });

  const tripsArr = await Trip.find({ _id: { $in: objectifiedTripIds } })
    .populate("owner")
    .then(trips => {
      return trips;
    });

  console.log(tripsArr);
  return tripsArr;
}

router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

router.get("/id/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!err) {
      res.json(user);
    } else {
      console.log(err);
    }
  });
});

// @route GET api/users/:username// @desc Find user with specific username
// @access Public
router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (!err) {
      res.json(user);
    } else {
      console.error(err);
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  //Form Validation
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by email
  User.findOne({ email }).then(user => {
    //Check if the user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched!
        //Create the JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          username: user.username,
          profilePicLink: user.profilePicLink
        };

        //Sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 Year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route DELETE api/users/:id
// @desc delete specific user
// @ access public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(User => User.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.patch("/id/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});
module.exports = router;
