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

const FriendRequestSchema = new Schema({
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
    required: true
  }
});

module.exports = FriendRequest = mongoose.model(
  "friendrequests",
  FriendRequestSchema
);
