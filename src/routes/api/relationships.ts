import * as express from "express";
const router = express.Router();
import Trip from "../../models/Trip";

//Load Form Validation
//PUT THAT SHIT HERE

// Load FriendRequestModel
import Relationship, { IRelationship } from "../../models/Relationship";

// @route POST api/trips/add
// @desc Create a new Trip
// @access Public
router.post("/add", (req, res) => {
  //Form Validation
  //@TODO PUT THAT SHIT HERE

  //MAKE SURE THERE IS NOT CURRENTLY A RELATIONSHIP BETWEEN THE TWO HERE!!!

  const newRelationship = new Relationship({
    requester: req.body.requester,
    recipient: req.body.recipient,
    status: req.body.status
  });

  newRelationship
    .save()
    .then(relationship => {
      res.json(relationship);
    })
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  Relationship.find({ recipient: req.params.id })
    .populate("requester", "name username profilePicLink")
    .then(requests => {
      res.json(requests);
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
  Relationship.findByIdAndUpdate(
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
  Relationship.findById(req.params.id)
    .then(Relationship => {
      if (Relationship) {
        Relationship.remove().then(() => res.json({ success: true }));
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});

export default router;
