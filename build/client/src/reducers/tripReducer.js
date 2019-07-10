"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
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
    ownedTripsLoading: true,
    loading: true,
    tripLoading: true,
    tripModalOpen: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.ADD_TRIP:
            console.log(action.payload);
            console.log("Pushing new location");
            return Object.assign({}, state, { trip: action.payload });
        case types_1.SET_TRIP_MODAL:
            console.log("Setting tripModalOpen to: ", action.payload);
            return Object.assign({}, state, { tripModalOpen: action.payload });
        case types_1.GET_TRIP:
            console.log(action.payload.joined);
            return Object.assign({}, state, { trip: action.payload, tripModalOpen: true, tripLoading: false });
        case types_1.CHANGE_SEARCHABLE_TRIPS:
            return Object.assign({}, state, { searchableTrips: action.payload });
        case types_1.GET_TRIPS:
            return Object.assign({}, state, { activeTrips: action.payload, searchableTrips: action.payload, loading: false });
        case types_1.GET_OWNED_TRIPS:
            return Object.assign({}, state, { ownedTrips: action.payload, ownedTripsLoading: false });
        case types_1.DELETE_TRIP_SUCCESS: {
            const oldState = state;
            const newTripsArray = Object.assign([], state.trips);
            console.log(action.payload);
            const indexOfTripToDelete = state.trips.findIndex(trip => {
                return trip._id === action.payload;
            });
            newTripsArray.splice(indexOfTripToDelete, 1);
            return Object.assign({}, state, { trips: newTripsArray });
        }
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=tripReducer.js.map