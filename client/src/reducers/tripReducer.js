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
  },
  loading: true
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
      console.log("Reducer: ", action.payload);
      return {
        ...state,
        trips: action.payload,
        loading: false
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
