import axios from "axios";
import history from "../history";
import isEmpty from "is-empty";

import {
  GET_USER,
  SEND_FRIEND_REQUEST,
  GET_NOTIFICATIONS,
  ADD_USER_TO_TRIP
} from "./types";
import { getTrip } from "./tripActions";
import { message } from "antd";

// SETUP VARS FOR LATER USE

export const getUser = username => dispatch => {
  axios
    .get(`/api/users/${username}`)
    .then(res => {
      if (!isEmpty(res.data)) {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      } else {
        history.push("/dashboard");
      }
    })
    .catch(err => {
      console.log("Error fetching User: " + err);
      history.push("/dashboard");
    });
};

export const sendRelationshipRequest = (requester, recipient) => dispatch => {
  var newRelationship = {
    requester: requester,
    recipient: recipient,
    status: 1
  };
  axios
    .post(`/api/relationships/add`, newRelationship)
    .then(res => {
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Error Sending Friend Request: " + err);
    });
};

export const getNotifications = user => async dispatch => {
  const relationships = getRelationships(user);
  const tripRelationships = getTripRelationships(user);

  await Promise.all([relationships, tripRelationships]).then(res => {
    console.log(res[0].concat(res[1]));
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res[0].concat(res[1])
    });
  });
};

const getRelationships = async user => {
  let relationships;
  await axios
    .get(`/api/relationships/${user}`)
    .then(res => {
      relationships = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return relationships;
};

const getTripRelationships = async user => {
  let tripRelationships;
  await axios
    .get(`/api/tripRelationships/${user}`)
    .then(res => {
      tripRelationships = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return tripRelationships;
};

export const acceptRelationship = requestID => dispatch => {
  let user1;
  let user2;
  const updateStatus = {
    status: 2
  };

  axios
    .patch(`/api/relationships/${requestID}`, updateStatus)
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
    });
};

export const acceptTripRelationship = requestID => dispatch => {
  console.log(requestID);
  let user;
  let tripID;
  const updateStatus = {
    status: 2
  };
  axios.patch(`/api/tripRelationships/${requestID}`, updateStatus).then(res => {
    console.log("Requester", res.data.requester);
    user = res.data.requester;
    tripID = res.data.trip;

    addUserToTrip(tripID, user);
    message.success("User has been added to Trip!");
  });
};

const addUserToTrip = (tripID, user1) => {
  axios.patch(`/api/trips/join/${tripID}`, { user: user1 }).then(res => {
    console.log(res.data);
  });
};

export const declineRelationship = requestID => dispatch => {
  const updateStatus = {
    status: 3
  };
  axios
    .patch(`/api/relationships/${requestID}`, updateStatus)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const addFriend = (user1, user2) => {
  //Create var to temporarily store the user's friends array
  let userFriends = [];

  //Send get request and return the friends array
  axios
    .get(`/api/users/id/${user1}`)
    .then(res => {
      //console.log(res.data)
      userFriends = res.data.friends;
    })
    .catch(err => {
      console.log('Error fetching user during "Add Friend" operation: ', err);
    });

  // Ensure the user is not already in the array!
  if (userFriends.includes(user2)) {
    // Add new user to array
    userFriends.push(user2);

    // Patch the new array with added friend in
    axios
      .patch(`/api/users/id/${user1}`, userFriends)
      .then(res => {
        //console.log(res)
      })
      .catch(err => {
        console.log(
          `Error adding new friend(${user2}) to user(${user1}): `,
          err
        );
      });
  } else {
    console.log("USER IS ALREADY A FRIEND!");
  }
};
