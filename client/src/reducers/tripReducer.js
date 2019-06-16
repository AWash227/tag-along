import {
  ADD_TRIP,
  GET_TRIP,
  SET_TRIP_MODAL,
  GET_TRIPS,
  GET_OWNED_TRIPS,
  DELETE_TRIP_SUCCESS,
  CHANGE_SEARCHABLE_TRIPS
} from "../actions/types";

import history from "../history";

const initialState = {
  //Data vars
  activeTrips: [],
  trip: {
    desination: "",
    startDate: "",
    endDate: "",
    time1: "",
    time2: "",
    seats: 0,
    donation: 0,
    meeting: "",
    owner: "",
    joined: []
  },
  searchableTrips: [],
  ownedTrips: [],

  // Loading vars
  ownedTripsLoading: true,
  loading: true,
  tripLoading: true,
  tripModalOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TRIP:
      console.log(action.payload);
      console.log("Pushing new location");
      return {
        ...state,
        trip: action.payload
      };
    case SET_TRIP_MODAL:
      console.log("Setting tripModalOpen to: ", action.payload);
      return {
        ...state,
        tripModalOpen: action.payload
      };
    case GET_TRIP:
      console.log(action.payload.joined);
      return {
        ...state,
        trip: action.payload,
        tripModalOpen: true,
        tripLoading: false
      };
    case CHANGE_SEARCHABLE_TRIPS:
      return {
        ...state,
        searchableTrips: action.payload
      };
    case GET_TRIPS:
      return {
        ...state,
        activeTrips: action.payload,
        searchableTrips: action.payload,
        loading: false
      };
    case GET_OWNED_TRIPS:
      return {
        ...state,
        ownedTrips: action.payload,
        ownedTripsLoading: false
      };
    case DELETE_TRIP_SUCCESS: {
      const oldState = state;
      const newTripsArray = Object.assign([], state.trips);
      console.log(action.payload);
      const indexOfTripToDelete = state.trips.findIndex(trip => {
        return trip._id === action.payload;
      });
      newTripsArray.splice(indexOfTripToDelete, 1);
      return {
        ...state,
        trips: newTripsArray
      };
    }
    default:
      return state;
  }
}
