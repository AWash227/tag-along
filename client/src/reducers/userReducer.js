import {
  GET_USER,
  GET_NOTIFICATIONS,
  ADD_USER_TO_TRIP
} from "../actions/types";
import isEmpty from "is-empty";

const initialState = {
  user: {},
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      if (!isEmpty(action.payload)) {
        return {
          ...state,
          user: action.payload
        };
      } else {
        break;
      }
    case ADD_USER_TO_TRIP:
      return {
        state
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
}
