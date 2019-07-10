"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const history_1 = require("../history");
const is_empty_1 = require("is-empty");
const types_1 = require("./types");
const antd_1 = require("antd");
exports.getUser = username => dispatch => {
    axios_1.default
        .get(`/api/users/${username}`)
        .then(res => {
        if (!is_empty_1.default(res.data)) {
            dispatch({
                type: types_1.GET_USER,
                payload: res.data
            });
        }
        else {
            history_1.default.push("/dashboard");
        }
    })
        .catch(err => {
        console.log("Error fetching User: " + err);
        history_1.default.push("/dashboard");
    });
};
exports.sendRelationshipRequest = (requester, recipient) => dispatch => {
    var newRelationship = {
        requester: requester,
        recipient: recipient,
        status: 1
    };
    axios_1.default
        .post(`/api/relationships/add`, newRelationship)
        .then(res => {
        dispatch({
            type: types_1.SEND_FRIEND_REQUEST,
            payload: res.data
        });
    })
        .catch(err => {
        console.log("Error Sending Friend Request: " + err);
    });
};
exports.getNotifications = user => (dispatch) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const relationships = getRelationships(user);
    const tripRelationships = getTripRelationships(user);
    yield Promise.all([relationships, tripRelationships]).then(res => {
        console.log(res[0].concat(res[1]));
        dispatch({
            type: types_1.GET_NOTIFICATIONS,
            payload: res[0].concat(res[1])
        });
    });
});
const getRelationships = (user) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let relationships;
    yield axios_1.default
        .get(`/api/relationships/${user}`)
        .then(res => {
        relationships = res.data;
    })
        .catch(err => {
        console.log(err);
    });
    return relationships;
});
const getTripRelationships = (user) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    let tripRelationships;
    yield axios_1.default
        .get(`/api/tripRelationships/${user}`)
        .then(res => {
        tripRelationships = res.data;
    })
        .catch(err => {
        console.log(err);
    });
    return tripRelationships;
});
exports.acceptRelationship = requestID => dispatch => {
    let user1;
    let user2;
    const updateStatus = {
        status: 2
    };
    axios_1.default
        .patch(`/api/relationships/${requestID}`, updateStatus)
        .then(res => {
        user1 = res.data.recipient;
        user2 = res.data.requester;
        exports.addFriend(user1, user2, true);
        exports.addFriend(user2, user1, false);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.acceptTripRelationship = requestID => dispatch => {
    console.log(requestID);
    let user;
    let tripID;
    const updateStatus = {
        status: 2
    };
    axios_1.default.patch(`/api/tripRelationships/${requestID}`, updateStatus).then(res => {
        console.log("Requester", res.data.requester);
        user = res.data.requester;
        tripID = res.data.trip;
        addUserToTrip(tripID, user);
        antd_1.message.success("User has been added to Trip!");
    });
};
const addUserToTrip = (tripID, user1) => {
    axios_1.default.patch(`/api/trips/join/${tripID}`, { user: user1 }).then(res => {
        console.log(res.data);
    });
};
exports.declineRelationship = requestID => dispatch => {
    const updateStatus = {
        status: 3
    };
    axios_1.default
        .patch(`/api/relationships/${requestID}`, updateStatus)
        .then(res => {
        console.log(res.data);
        antd_1.message.success("Friend Request has been declined!");
    })
        .catch(err => {
        console.log(err);
    });
};
exports.addFriend = (user1, user2, warn) => {
    let userFriends = [];
    axios_1.default
        .get(`/api/users/id/${user1}`)
        .then(res => {
        userFriends = res.data.friends;
    })
        .catch(err => {
        console.log('Error fetching user during "Add Friend" operation: ', err);
    });
    if (userFriends.includes(user2)) {
        userFriends.push(user2);
        axios_1.default
            .patch(`/api/users/id/${user1}`, userFriends)
            .then(res => {
            antd_1.message.success("Friend Request accepted!");
        })
            .catch(err => {
            console.log(`Error adding new friend(${user2}) to user(${user1}): `, err);
        });
    }
    else {
        if (warn) {
            console.log("USER IS ALREADY A FRIEND!");
            antd_1.message.warn("You are already friends with this person!");
        }
        else {
            console.log("USER IS ALREADY A FRIEND!");
        }
    }
};
//# sourceMappingURL=userActions.js.map