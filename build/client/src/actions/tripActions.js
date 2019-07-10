"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const antd_1 = require("antd");
const history_1 = require("../history");
const types_1 = require("./types");
const date_and_time_1 = require("date-and-time");
exports.addTrip = values => dispatch => {
    const startDate1 = date_and_time_1.default.parse(`${values.startDate} ${values.startTime}`, "YYYY-MM-DD HH:mm");
    const endDate1 = date_and_time_1.default.parse(`${values.endDate} ${values.endTime}`, "YYYY-MM-DD HH:mm");
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
    axios_1.default
        .post("/api/trips/add", newTrip)
        .then(res => {
        console.log("Trip owner is: ", res.data.owner);
        console.log(res);
        antd_1.message.success(`Your Trip to: ${newTrip.destination} has been added!`);
        dispatch({
            type: types_1.ADD_TRIP,
            payload: res.data
        });
        history_1.default.push(`/trips/${res.data._id}`);
    })
        .catch(err => console.log("Error adding trip: ", err));
};
exports.changeSearchableTrips = tripArr => dispatch => {
    dispatch({
        type: types_1.CHANGE_SEARCHABLE_TRIPS,
        payload: tripArr
    });
};
exports.getTrip = tripId => dispatch => {
    axios_1.default
        .get(`/api/trips/${tripId}`)
        .then(res => {
        dispatch({
            type: types_1.GET_TRIP,
            payload: res.data
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.tagAlong = (tripId, userId, ownerId) => dispatch => {
    const newTripRelationship = {
        trip: tripId,
        requester: userId,
        recipient: ownerId,
        status: 1
    };
    axios_1.default.post("/api/tripRelationships/add", newTripRelationship).then(res => {
        console.log(`Added Trip Relationship:\n Trip: ${tripId}\n Requester: ${userId}\n Recipient: ${ownerId}`);
        dispatch({
            type: types_1.ADD_TRIP_RELATIONSHIP,
            payload: res.data
        });
    });
};
exports.setTripModal = bool => dispatch => {
    history_1.default.push("/dashboard");
    dispatch({
        type: types_1.SET_TRIP_MODAL,
        payload: bool
    });
};
exports.getOwnedTrips = userId => dispatch => {
    axios_1.default
        .get(`/api/users/trips/owned/${userId}`)
        .then(res => {
        dispatch({
            type: types_1.GET_OWNED_TRIPS,
            payload: res.data
        });
    })
        .catch(err => console.log("Error fetching user's owned trips: ", err));
};
exports.getTrips = userId => dispatch => {
    axios_1.default
        .get(`/api/users/trips/${userId}`)
        .then(res => {
        dispatch({
            type: types_1.GET_TRIPS,
            payload: res.data
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteTrip = tripId => dispatch => {
    axios_1.default
        .delete(`/api/trips/${tripId}`)
        .then(res => {
        console.log("Trip deleted is: ", res.data);
        antd_1.message.success(`'${res.data.destination}' has been Deleted!`);
        dispatch({
            type: types_1.DELETE_TRIP_SUCCESS,
            payload: tripId
        });
    })
        .catch(err => {
        dispatch({
            type: types_1.DELETE_TRIP_FAILURE,
            payload: err.data
        });
    });
};
//# sourceMappingURL=tripActions.js.map