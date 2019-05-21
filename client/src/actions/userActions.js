import axios from 'axios';
import history from '../history';
import isEmpty from 'is-empty';

import {
  GET_USER
} from './types';

export const getUser = (username) => dispatch => {
  
  axios.get(`/api/users/${username}`)
    .then((res) => {
      if(!isEmpty(res.data)){
        dispatch({
          type: GET_USER,
          payload: res.data
        })
      } else {
        history.push('/dashboard')
      }
    })
    .catch(err => {
      console.log('Error fetching User: ' + err)
      history.push('/dashboard')
    })
}