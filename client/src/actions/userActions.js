import axios from 'axios';
import history from '../history';
import isEmpty from 'is-empty';

import {
  GET_USER,
  SEND_FRIEND_REQUEST,
  GET_NOTIFICATIONS
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

export const sendFriendRequest = (requester, recipient) => dispatch => {
  var newRelationship = {
    requester: requester,
    recipient: recipient,
    status: 1
  }
  axios.post(`/api/friendrequests/add`, newRelationship)
    .then((res) => {
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('Error Sending Friend Request: ' + err);
    })
}

export const getNotifications = (user) => dispatch => {
  axios.get(`/api/friendrequests/${user}`)
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      })
      console.log(res.data)
    })
}

export const acceptFriendRequest = (requestID) => dispatch => {
  const updateStatus = {
    status: 2
  }
  axios.patch(`/api/friendrequests/${requestID}`, updateStatus)
    .then(res => {
      console.log(res.data)
    })
}

export const declineFriendRequest = (requestID) => dispatch => {
  const updateStatus = {
    status: 3
  }
  axios.patch(`/api/friendrequests/${requestID}`, updateStatus)
    .then(res => {
      console.log(res.data)
    })
}