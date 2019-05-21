import axios from "axios";
import { message } from "antd";

import {
  ADD_TRIP,
  GET_TRIPS,
  DELETE_TRIP,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILURE
} from "./types";
import date from "date-and-time";
import UserGroup from "../components/Trip/UserGroup";

//Add the Trip
export const addTrip = (values, history) => dispatch => {
  console.log("Initial startDate is: " + values.startDate);
  console.log("Initial endDate is: " + values.endDate);
  //Parse the dates into storeable GMT dates
  const startDate1 = date.parse(
    `${values.startDate} ${values.startTime}`,
    "YYYY-MM-DD HH:mm"
  );
  console.log("Start date is: " + startDate1)
  const endDate1 = date.parse(
    `${values.endDate} ${values.endTime}`,
    "YYYY-MM-DD HH:mm"
  );
  console.log("End date is: " + endDate1)

  const newTrip = {
    destination: values.destination,
    startDate: startDate1,
    endDate: endDate1,
    seats: values.seats,
    donation: values.donation,
    meeting: values.meeting,
    owner: values.owner
  };

  console.log("Creating new Trip");
  axios
    .post("/api/trips/add", newTrip)
    .then(res => {
      console.log(res);
      message.success("Trip added.");
      //history.push(`/trips/${res.id}`);
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

export const deleteTrip = (tripId) => dispatch => {
  axios.delete(`/api/trips/${tripId}`)
    .then(res => {
      console.log(res)
      dispatch({
        type: DELETE_TRIP_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: DELETE_TRIP_FAILURE,
        payload: err.data
      })
    })
}