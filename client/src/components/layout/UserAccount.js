import React, { Component } from "react";
import { Typography, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUser, sendRelationshipRequest } from "../../actions/userActions";

const { Title, Text } = Typography;

class UserAccount extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.username);
    if (this.props.auth.user.username == this.props.match.params.username) {
      this.props.history.push("/account");
    }
  }

  render() {
    return (
      <div>
        <Title>Their Account</Title>
        <div id="surround-form">
          <Avatar
            style={{ width: 75, height: 75, display: "inline-block" }}
            src={this.props.user.user.profilePicLink}
          />
          <div className="account-names">
            <Title level={4}>{this.props.user.user.name}</Title>
            <Text type="secondary">@{this.props.user.user.username}</Text>
          </div>
          <Button
            onClick={() =>
              this.props.sendRelationshipRequest(
                this.props.auth.user.id,
                this.props.user.user
              )
            }
          >
            Add Friend
          </Button>
        </div>
      </div>
    );
  }
}
UserAccount.propTypes = {
  getUser: PropTypes.func.isRequired,
  sendRelationshipRequest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUser, sendRelationshipRequest }
)(UserAccount);
