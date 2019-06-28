import * as mongoose from "mongoose";
import { ITrip } from "./Trip";
import { IUser } from "./User";

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

export interface ITripRelationship extends mongoose.Document {
  trip: ITrip;
  requester: IUser;
  recipient: IUser;
  status: number;
}

const TripRelationshipSchema = new mongoose.Schema({
  // TRIP THAT OWNS THE RELATIONSHIPS
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trips",
    required: true
  },
  // PERSON WHO SENDS REQUEST
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  // PERSON WHO RECEIVES REQUEST
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
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

const TripRelationship = mongoose.model<ITripRelationship>(
  "tripRelationships",
  TripRelationshipSchema
);
export default TripRelationship;
