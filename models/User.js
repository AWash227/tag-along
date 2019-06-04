const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profilePicLink: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  joinedTrips: [{ type: Schema.Types.ObjectId, ref: "trips" }],
  trips: [{ type: Schema.Types.ObjectId, ref: "trips" }]
});

module.exports = User = mongoose.model("users", UserSchema);
