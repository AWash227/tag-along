import {
  GET_USER, SEND_FRIEND_REQUEST, GET_NOTIFICATIONS
} from '../actions/types';
import isEmpty from 'is-empty';

const initialState = {
  user: {},
  notifications: []
};

export default function(state = initialState, action) {
  switch(action.type) {
   case GET_USER:
    if(!isEmpty(action.payload)){
      return{
        ...state, user: action.payload
      }
    }
    case GET_NOTIFICATIONS:
    return{
      ...state, notifications: action.payload
    }
  default:
    return state;
  }
}
