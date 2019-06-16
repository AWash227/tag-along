const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");
mongoose.model("users");

//Create Schema
const TripSchema = new Schema({
  //Properties
  destination: {
    type: String,
    required: true,
    default: "Second Location"
  },
  seats: {
    type: Number,
    default: 0,
    required: true
  },
  donation: {
    type: Number,
    default: "0",
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
  active: {
    type: Boolean,
    default: true,
    required: true
  },

  //User Schema linking and stuff
  joined: [{ type: Schema.Types.ObjectId, ref: "users", unique: true }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});
module.exports = Trip = mongoose.model("trips", TripSchema);
