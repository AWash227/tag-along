import { ADD_TRIP, GET_TRIPS, DELETE_TRIP_SUCCESS } from "../actions/types";

const initialState = {
  trips: [],
  trip: {
    desination: "",
    startDate: "",
    endDate: "",
    time1: "",
    time2: "",
    seats: 0,
    donation: 0,
    meeting: "",
    owner: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TRIP:
      console.log(action.payload);
      return {
        ...state,
        trip: action.payload
      };
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload
      };
    case DELETE_TRIP_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfTripToDelete = state.findIndex(trip => {
        return trip.id === action.trip.id;
      });
      newState.splice(indexOfTripToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
