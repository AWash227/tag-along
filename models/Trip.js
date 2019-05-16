const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User')

//Create Schema
const TripSchema = new Schema({
  //Properties
  location1: {
    type: String,
    required: true,
    default: 'First Location'
  },
  location2: {
    type: String,
    required: true,
    default: 'Second Location'
  },
  seats: {
    type: Number,
    default: 0,
    required: true
  },
  donation: {
    type: Number,
    default: '0',
    required: true
  },
  //Dates and times
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  //User Schema linking and stuff
  viewableBy: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  },
  owner:{
    type: Schema.Types.ObjectId, ref: 'User'
  }
})
module.exports = Trip = mongoose.model('trips', TripSchema);