import * as mongoose from "mongoose";
import User, { IUser } from "./User";

mongoose.model("users");

export interface ITrip extends mongoose.Document {
  destination: string;
  seats: number;
  donation: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  joined: IUser[];
  owner: IUser;
}

//Create Schema
const TripSchema = new mongoose.Schema({
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
  joined: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true }
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});
const Trip = mongoose.model<ITrip>("trips", TripSchema);
export default Trip;
