import axios from 'axios';
import history from '../history';
import isEmpty from 'is-empty';

import {
  GET_USER,
  SEND_FRIEND_REQUEST,
  GET_NOTIFICATIONS
} from './types';

// SETUP VARS FOR LATER USE
let user1;
let user2;

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

export const sendRelationshipRequest = (requester, recipient) => dispatch => {
  var newRelationship = {
    requester: requester,
    recipient: recipient,
    status: 1
  }
  axios.post(`/api/relationships/add`, newRelationship)
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
  axios.get(`/api/relationships/${user}`)
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      })
      console.log(res.data)
    })
}

export const acceptRelationship = (requestID) => dispatch => {
  const updateStatus = {
    status: 2
  }



  axios.patch(`/api/relationships/${requestID}`, updateStatus)
    .then(res => {
      // Log the response
      //console.log(res.data)

      // Set the vars
      user1 = res.data.recipient;
      user2 = res.data.requester;

      //Add friend to both users
      addFriend(user1, user2);
      addFriend(user2, user1);
    })
    .catch(err => {
      console.log(err);
    })

  
}


export const declineRelationship = (requestID) => dispatch => {
  const updateStatus = {
    status: 3
  }
  axios.patch(`/api/relationships/${requestID}`, updateStatus)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const addFriend = (user1, user2) => {
  //Create var to temporarily store the user's friends array
  let userFriends = [];

  //Send get request and return the friends array
  axios.get(`/api/users/id/${user1}`)
    .then((res) => {
      //console.log(res.data)
      userFriends = res.data.friends;
    })
    .catch((err) => {
      console.log("Error fetching user during \"Add Friend\" operation: ", err)
    })

  // Ensure the user is not already in the array!
  if(userFriends.includes(user2)){
    // Add new user to array
    userFriends.push(user2);

    // Patch the new array with added friend in
    axios.patch(`/api/users/id/${user1}`, userFriends)
      .then((res) => {
        //console.log(res)
      })
      .catch((err) => {
        console.log(`Error adding new friend(${user2}) to user(${user1}): `, err)
      })

  } else {
    console.log("USER IS ALREADY A FRIEND!")
  }
  
}