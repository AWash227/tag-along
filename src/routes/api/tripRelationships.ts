import * as express from "express";
const router = express.Router();
import Trip, { ITrip } from "../../models/Trip";
import User, { IUser } from "../../models/User";

//Load Form Validation
//PUT THAT SHIT HERE

// Load Trip Relationship Model
import TripRelationship, {
  ITripRelationship
} from "../../models/TripRelationship";
import * as mongoose from "mongoose";

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

router.get("/:triprequest/accept", (req: any, res: any) => {
  // Find the trip relationship by "Triprequest" in the body
  TripRelationship.findById(req.params.triprequest).then(
    // Take it and ensure it is a triprelationship
    (tripRequest: ITripRelationship | null) => {
      // find the user by the trip relationship's requester field
      if (tripRequest && tripRequest.requester) {
        User.findById(tripRequest.requester).then(user => {
          if (user && user.joinedTrips) {
            user.joinedTrips.push(tripRequest.trip);
            user.save(user2 => {
              console.log(
                `Updated ${user2.name}'s "JoinedTrips"`,
                user2.joinedTrips
              );
              res.json("Added trip to user's 'JoinedTrips'");
            });
          }
        });
      }
    }
  );
  res.json("Trip could not be added to user's 'JoinedTrips'");
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
      if (!err) {
        res.json(relationship);
      }
    }
  );
});

// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access public
router.delete("/:id", (req, res) => {
  TripRelationship.findById(req.params.id)
    .then(TripRelationship => {
      if (TripRelationship) {
        TripRelationship.remove().then(() => res.json({ success: true }));
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});

export default router;
