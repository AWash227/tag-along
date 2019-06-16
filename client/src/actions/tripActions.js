import axios from "axios";
import { message } from "antd";
import history from "../history";

import {
  ADD_TRIP,
  GET_TRIPS,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILURE,
  GET_TRIP,
  SET_TRIP_MODAL,
  GET_OWNED_TRIPS,
  ADD_TRIP_RELATIONSHIP,
  CHANGE_SEARCHABLE_TRIPS
} from "./types";
import date from "date-and-time";
import ActionButton from "antd/lib/modal/ActionButton";

//Add the Trip
export const addTrip = values => dispatch => {
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
      dispatch({
        type: ADD_TRIP,
        payload: res.data
      });
      history.push(`/trips/${res.data._id}`);
    })
    .catch(err => console.log("Error adding trip: ", err));
};

export const changeSearchableTrips = tripArr => dispatch => {
  dispatch({
    type: CHANGE_SEARCHABLE_TRIPS,
    payload: tripArr
  });
};

export const getTrip = tripId => dispatch => {
  axios
    .get(`/api/trips/${tripId}`)
    .then(res => {
      dispatch({
        type: GET_TRIP,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const tagAlong = (tripId, userId, ownerId) => dispatch => {
  const newTripRelationship = {
    trip: tripId,
    requester: userId,
    recipient: ownerId,
    status: 1
  };

  // Create a new trip relationship
  axios.post("/api/tripRelationships/add", newTripRelationship).then(res => {
    console.log(
      `Added Trip Relationship:\n Trip: ${tripId}\n Requester: ${userId}\n Recipient: ${ownerId}`
    );
    dispatch({
      type: ADD_TRIP_RELATIONSHIP,
      payload: res.data
    });
  });
};

export const setTripModal = bool => dispatch => {
  history.push("/dashboard");
  dispatch({
    type: SET_TRIP_MODAL,
    payload: bool
  });
};

export const getOwnedTrips = userId => dispatch => {
  axios
    .get(`/api/users/trips/owned/${userId}`)
    .then(res => {
      dispatch({
        type: GET_OWNED_TRIPS,
        payload: res.data
      });
    })
    .catch(err => console.log("Error fetching user's owned trips: ", err));
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
