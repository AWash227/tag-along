import * as mongoose from "mongoose";
import { IUser } from "./User";
import { ITrip } from "./Trip";

require("./User");
mongoose.model("users");

export interface IRelationship extends mongoose.Document {
  requester: IUser;
  recipient: ITrip;
  status: number;
}
/*

  FRIEND REQUEST VALUE MEANINGS
  1 = Requested,
  2 = Accepted,
  3 = Rejected

*/

const RelationshipSchema = new mongoose.Schema({
  // PERSON WHO SENDS REQUEST
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    unique: true,
    required: true
  },
  // PERSON WHO RECEIVES REQUEST
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
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

const Relationship = mongoose.model<IRelationship>(
  "relationships",
  RelationshipSchema
);

export default Relationship;
