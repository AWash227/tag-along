import axios from "axios";
import { message } from "antd";

import {
  ADD_TRIP,
  GET_TRIPS
} from "./types";
import date from "date-and-time";

//Add the Trip
export const addTrip = (values, history) => dispatch => {
  //Parse the dates into storeable GMT dates
  const startDate = date.parse(
    `${values.startDate} ${values.startTime}`,
    "YYYY-MM-DD HH:mm"
  );
  const endDate = date.parse(
    `${values.endDate} ${values.endTime}`,
    "YYYY-MM-DD HH:mm"
  );

  const newTrip = {
    location1: values.location1,
    location2: values.location2,
    startDate: startDate,
    endDate: endDate,
    seats: values.seats,
    donation: values.donation,
    meeting: values.meeting
  };

  console.log("Creating new Trip");
  axios
    .post("/api/trips/add", newTrip)
    .then(res => {
      console.log(res);
      message.success("Trip added.");
      history.push(`/trips/${res.id}`);
    })
    .catch(err =>
      dispatch({
        type: ADD_TRIP,
        payload: err.response.data
      })
    );
};

export const getTrips = () => dispatch => {
  axios
    .get("/api/trips/")
    .then(res => {
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      })
      console.log(res);
    })
    .catch(err => {
      console.error("Error getting trips: ", err);
    });
};
