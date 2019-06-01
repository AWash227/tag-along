import axios from "axios";
import { message } from "antd";

import {
  ADD_TRIP,
  GET_TRIPS,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILURE
} from "./types";
import date from "date-and-time";

//Add the Trip
export const addTrip = (values, history) => dispatch => {
  //Parse the dates into storeable GMT dates
  const startDate1 = date.parse(
    `${values.startDate} ${values.startTime}`,
    "YYYY-MM-DD HH:mm"
  );

  const endDate1 = date.parse(
    `${values.endDate} ${values.endTime}`,
    "YYYY-MM-DD HH:mm"
  );

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
      console.log("Trip owner is: ", res.data.owner);
      console.log(res);
      message.success(`Your Trip to: ${newTrip.destination} has been added!`);
      //history.push(`/trips/${res.id}`);
    })
    .catch(err =>
      dispatch({
        type: ADD_TRIP,
        payload: err.response.data
      })
    );
};

export const getTrips = userId => dispatch => {
  // Get an array of trip ids
  axios
    .get(`/api/users/trips/${userId}`)
    .then(res => {
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });

  /*
  axios
    .get("/api/trips/")
    .then(res => {
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      console.error("Error getting trips: ", err);
    });
    */
};

export const deleteTrip = tripId => dispatch => {
  axios
    .delete(`/api/trips/${tripId}`)
    .then(res => {
      console.log("Trip deleted is: ", res.data);
      message.success(`'${res.data.destination}' has been Deleted!`);
      dispatch({
        type: DELETE_TRIP_SUCCESS,
        payload: tripId
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_TRIP_FAILURE,
        payload: err.data
      });
    });
};
