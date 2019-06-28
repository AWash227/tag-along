import React, { Component } from "react";
import { Typography, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserTop from "./UserTop";

import { getUser, sendRelationshipRequest } from "../../actions/userActions";

const { Title, Text } = Typography;

class UserAccount extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.username);
    if (this.props.auth.user.username == this.props.match.params.username) {
      this.props.history.push("/account");
    }
  }
  handleFollowClick() {
    this.props.sendRelationshipRequest(
      this.props.auth.user.id,
      this.props.user.user
    );
  }

  render() {
    return (
      <div style={{ marginTop: 60 }}>
        <div id="surround-form">
          <UserTop
            user={this.props.user.user}
            editable={false}
            buttonClick={() => this.handleFollowClick}
          />
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
