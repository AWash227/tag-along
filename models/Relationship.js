const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./User");
mongoose.model("users");

/*

  FRIEND REQUEST VALUE MEANINGS
  1 = Requested,
  2 = Accepted,
  3 = Rejected

*/

const RelationshipSchema = new Schema({
  // PERSON WHO SENDS REQUEST
  requester: {
    type: Schema.Types.ObjectId,
    ref: "users",
    unique: true,
    required: true
  },
  // PERSON WHO RECEIVES REQUEST
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true
  },
  // STATUS OF REQUEST
  status: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  }
});

module.exports = Relationship = mongoose.model(
  "relationships",
  RelationshipSchema
);
