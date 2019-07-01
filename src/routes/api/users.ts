import * as express from "express";
const router = express.Router();
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import keys from "../../config/keys";
import * as mongoose from "mongoose";

//Load input validation
import { validateRegisterInput } from "../../validation/register";
import { validateLoginInput } from "../../validation/login";

//Load User Model
import User, { IUser } from "../../models/User";
import Trip from "../../models/Trip";

/* 
  helper functions
  helper functions
  helper functions
*/

function eliminateDuplicates(arr: any[]) {
  var i: number,
    len = arr.length,
    out: any = [],
    obj: any = {};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

// Takes in array of trip ids, and returns array of trips that are populated
async function fetchTripsFromArray(tripIds: any[], hasFriends: boolean) {
  let tripsarr = [];
  // convert array to objectids
  if (hasFriends) {
    const objectifiedTripIds = tripIds.map(trip => {
      // If it exists return it as objectID
      if (trip) {
        return mongoose.Types.ObjectId(trip);
        // If it doesn't exist return nothing
      } else if (!trip || trip == null) {
        return;
      }
    });

    const tripsArr = await Trip.find({ _id: { $in: objectifiedTripIds } })
      .populate("owner", "id name username profilePicLink")
      .then(trips => {
        return trips;
      });

    return tripsArr;
  } else {
    return [];
  }
}

/*
 ROUTES GO HERE 
 ROUTES GO HERE
 ROUTES GO HERE
*/

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

  User.findOne({ email: req.body.email }).then((user: any) => {
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
  // init vars to handle shit
  let tripsIdsBD: mongoose.Schema.Types.ObjectId[] = [];
  let sortedTrips: mongoose.Schema.Types.ObjectId[] = [];
  let tripsIds: mongoose.Schema.Types.ObjectId[] = [];
  let hasFriends = false;
  let hasTrips = false;

  // Take the id of the user and find them
  User.findById(req.params.id)
    // populate the trips array for each friend
    .populate("friends", "trips")
    .then(user => {
      // If the user is not returned or the user has no friends, don't continue
      if (!user || !user.friends) {
        hasFriends = false;
      } else {
        hasFriends = true;
        // If they exist, and have friends, then look into each friend and return their trips
        // Map over the user's friends
        user.friends.forEach((friend: IUser) => {
          // Add all of the trips for each friend
          if (friend != undefined && friend.trips != undefined) {
            friend.trips.forEach(trip => {
              tripsIdsBD.push(trip);
            });
          }
        });

        // Sort the trips cuz idk why
        sortedTrips = tripsIdsBD.slice().sort();

        // Find and remove the duplicates
        tripsIds = eliminateDuplicates(sortedTrips);

        if (tripsIds) {
          hasTrips = true;
        } else {
          hasTrips = false;
        }
      }
      // If trips exist
      if (hasFriends) {
        // TODO Removes all matching elements
        const trips = fetchTripsFromArray(tripsIds, hasFriends);
        trips
          .then(trips => {
            res.json(trips);
            return trips;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.json("Has no Trips");
      }
      // Log the trips
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/trips/owned/:id", async (req, res) => {
  User.findById(req.params.id)
    .populate("trips", "destination active")
    .then(user => {
      if (user) {
        res.json(user.trips);
      }
    });
});

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
          profilePicLink: user.profilePicLink,
          trips: user.trips,
          joinedTrips: user.joinedTrips,
          friends: user.friends
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
    .then(User => {
      if (User) {
        User.remove().then(() => res.json({ success: true }));
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});

router.patch("/id/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: any, user: any) => {
    if (!err) {
      res.json(user);
    }
  });
});
export default router;
