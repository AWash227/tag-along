import React, { Component } from "react";
import { Typography, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getNotifications,
  acceptRelationship,
  declineRelationship
} from "../../actions/userActions";

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
            renderItem={notification => (
              <List.Item
                actions={[
                  <a
                    href="/#"
                    onClick={() =>
                      this.props.acceptRelationship(notification._id)
                    }
                  >
                    Accept
                  </a>,
                  <a
                    href="/#"
                    onClick={() =>
                      this.props.declineRelationship(notification._id)
                    }
                  >
                    Decline
                  </a>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundImage: `url(${
                          notification.requester.profilePicLink
                        })`,
                        backgroundSize: "contain",
                        backgroundColor: "rgb(150,150,150)",
                        backgroundBlendMode: "multiply"
                      }}
                      icon="user-add"
                    />
                  }
                  title={[
                    "Friend Request from: ",
                    <Link
                      key={2}
                      to={`/user/${notification.requester.username}`}
                    >
                      {" "}
                      {notification.requester.name}{" "}
                    </Link>
                  ]}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
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
  { getNotifications, acceptRelationship, declineRelationship }
)(Notifications);
