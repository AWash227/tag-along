import {
  GET_USER
} from '../actions/types';
import isEmpty from 'is-empty';

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
   case GET_USER:
    if(!isEmpty(action.payload)){
      return{
        ...state, user: action.payload
      }
    }
  default:
    return state;
  }
}
