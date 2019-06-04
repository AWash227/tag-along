import React, { Component } from "react";
import { Typography, List, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getNotifications,
  acceptRelationship,
  acceptTripRelationship,
  //declineTripRelationship,
  declineRelationship
} from "../../../actions/userActions";

// NOTIFICATION TYPES IMPORTS
import FriendRequest from "./FriendRequest";
import TripRequest from "./TripRequest";

const { Title } = Typography;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.getNotifications(this.props.auth.user.id);
  }

  render() {
    return (
      <div>
        <Title>Your Notifications</Title>
        <div id="surround-form">
          <List
            itemLayout="horizontal"
            dataSource={this.props.user.notifications}
            renderItem={notification =>
              !notification.trip ? (
                <FriendRequest
                  acceptRelationship={this.props.acceptRelationship}
                  declineRelationship={this.props.declineRelationship}
                  notification={notification}
                />
              ) : (
                <TripRequest
                  acceptTripRelationship={this.props.acceptTripRelationship}
                  declineTripRelationship={this.props.declineTripRelationship}
                  notification={notification}
                />
              )
            }
          />
        </div>
      </div>
    );
  }
}
Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  acceptTripRelationship: PropTypes.func.isRequired,
  //declineTripRelationship: PropTypes.func.isRequired,
  acceptRelationship: PropTypes.func.isRequired,
  declineRelationship: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getNotifications,
    acceptRelationship,
    declineRelationship,
    acceptTripRelationship
    //declineTripRelationship
  }
)(Notifications);
