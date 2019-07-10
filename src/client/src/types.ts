import * as mongoose from "mongoose";
export const emptyUser = {
  name: "",
  username: "",
  profilePicLink: "",
  email: "",
  password: "",
  friends: [],
  trips: [],
  joinedTrips: []
};

export interface IUser {
  name: string;
  username: string;
  profilePicLink: string;
  email: string;
  password: string;
  friends: IUser[];
  joinedTrips: ITrip[];
  trips: mongoose.Schema.Types.ObjectId[];
}

export interface ITrip {
  destination: string;
  seats: number;
  donation: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  joined: IUser[];
  owner: IUser;
}
