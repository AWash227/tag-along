import * as mongoose from "mongoose";
import { ITrip } from "./Trip";

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  profilePicLink: string;
  email: string;
  password: string;
  date: Date;
  friends: IUser[];
  joinedTrips: ITrip[];
  trips: mongoose.Schema.Types.ObjectId[];
}

// Create Schema
export const UserSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  joinedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }],
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "trips" }]
});

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
