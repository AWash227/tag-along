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
  //User Schema linking and stuff
  viewableBy: {
    users: [{ type: Schema.Types.ObjectId, ref: "users" }]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});
module.exports = Trip = mongoose.model("trips", TripSchema);
