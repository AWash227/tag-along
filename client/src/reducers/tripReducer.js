import {
  ADD_TRIP,
  ADD_TRIP_1,
  ADD_TRIP_2,
  ADD_TRIP_3,
  GET_TRIPS
} from '../actions/types';

const initialState = {
  trips: [],
  trip: {
    location1: '',
    location2: '',
    startDate: '',
    endDate: '',
    time1: '',
    time2: '',
    seats: 0,
    donation: 0,
    meeting: '',
  },
  trip1: {
    location1: '',
    location2: '',
  },
  trip2: {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  },
  trip3: {
    seats: 0,
    donation: 0,
    meeting: ''
  }
}


export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_TRIP:
    return{
      ...state,
      trip: action.payload
    }
    case ADD_TRIP_1:
    return{
      ...state,
      trip1: action.payload,
      trip: {
        ...state.trip, 
        location1: action.payload.location1,
        location2: action.payload.location2
      }
    }
    case ADD_TRIP_2:
    return{
      ...state,
      trip2: {
        startDate: action.payload.startDateI,
        startTime: action.payload.startTimeI,
        endDate: action.payload.endDateI,
        endTime: action.payload.endTimeI
      },
      trip: {
        ...state.trip,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      }
    }
    case ADD_TRIP_3:
    return{
      ...state,
      trip3: action.payload,
      trip: {
        ...state.trip,
        seats: action.payload.seats,
        donation: action.payload.donation,
        meeting: action.payload.meeting
      }
    }
    case GET_TRIPS:
    return{
      ...state, trips: action.payload
    }
    default:
      return state;
  }
}