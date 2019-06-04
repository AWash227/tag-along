const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./User");
require("./Trip");
mongoose.model("trips");
mongoose.model("users");

/*

  FRIEND REQUEST VALUE MEANINGS
  1 = Requested,
  2 = Accepted,
  3 = Rejected

*/

const TripRelationshipSchema = new Schema({
  // TRIP THAT OWNS THE RELATIONSHIPS
  trip: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true
  },
  // PERSON WHO SENDS REQUEST
  requester: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  // PERSON WHO RECEIVES REQUEST
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  // STATUS OF REQUEST
  status: {
    type: Number,
    default: 1,
    enum: [1, 2, 3],
    required: true
  }
});

module.exports = TripRelationship = mongoose.model(
  "tripRelationships",
  TripRelationshipSchema
);
