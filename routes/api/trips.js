const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

//Load Form Validation
//PUT THAT SHIT HERE

//Load Trip Model
const Trip = require('../../models/Trip');

// @route POST api/trips/add
// @desc Create a new Trip
// @access Public
router.post('/add', (req,res) => {
  //Form Validation
  //@TODO PUT THAT SHIT HERE

  const newTrip = new Trip({
    title: req.body.title,
    images: req.body.images,
    address1: req.body.location1,
    address2:req.body.address2,
    has_car: req.body.has_car,
    available_seats: req.body.available_seats,
    requested_price: req.body.requested_price,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime,
    is_public: req.body.is_public,
    viewable_by: req.body.viewable_by,
    owner: req.body.owner
  });

  newTrip.save().then(trip => res.json(trip)).catch(err=> console.log(err));

})

// @route GET api/trips/
// @desc Get all trips
// @access public
router.get('/', (req,res) => {
  Trip.find().then(trips => res.json(trips));
})

// @route GET api/Trip
// @desc Get one specific trip
// @access public
router.get('/:id', (req, res) => {
  Trip.findById(req.params.id)
    .then((Trip) => {
      res.json(Trip);
    })
    .catch(err => {
      console.log(err)
    })
})

// @route PATCH api/trips/:id
// @desc update specific trip
// @access public
router.patch('/:id', (req,res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, (err, trip) => {
    if(err) return next(err);
    res.json(trip);
  })
})

// @route DELETE api/trips/:id
// @desc delete specific trip
// @ access public
router.delete('/:id', (req, res) => {
  Trip.findById(req.params.id)
    .then(Trip => Trip.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;