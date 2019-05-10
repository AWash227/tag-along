const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User')

const full_addr = new Schema({
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: false
  },
  address3: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  subdivision: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  }

})
//Create Schema
const TripSchema = new Schema({
  //Properties
  title: {
    type: String,
    default: 'New Trip',
    required: true,
  },
  description: {
    type: String,
    default: 'Trip Description',
    required: false
  },
  address1: {
    type: [full_addr],
    required: false
  },
  address2: {
    type: [full_addr],
    required: false
  },
  has_car: {
    type: Boolean,
    default: true,
    required: true
  },
  available_seats: {
    type: Number,
    required: false
  },
  requested_price: {
    type: Number,
    default: '0',
    required: true
  },
  //Dates and times
  start_datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  end_datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  //Privacy
  is_public: {
    type: Boolean,
    default: false,
    required: true
  },
  //User Schema linking and stuff
  viewable_by: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  },
  owner:{
    type: Schema.Types.ObjectId, ref: 'User'
  }
})
module.exports = Trip = mongoose.model('trips', TripSchema);