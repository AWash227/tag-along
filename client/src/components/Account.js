import React, { Component } from "react";
import { Typography, Avatar, List } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { Title, Text } = Typography;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        name: "Andrew Washburn",
        profilePicLink:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/13344686_1782719515290750_5895247083997579600_n.jpg?_nc_cat=107&_nc_ht=scontent-iad3-1.xx&oh=595759942d5da7ee9f88edfbd5941849&oe=5D51BE81"
      }
    };
  }

  componentDidMount() {
    console.log(this.props.auth);
  }

  render() {
    return (
      <div>
        {/* Account Info Section */}
        <Title>Your Account</Title>
        <div id="surround-form">
          <Avatar
            style={{ width: 75, height: 75, display: "inline-block" }}
            src={this.props.auth.user.profilePicLink}
          />
          <div className="account-names">
            <Title level={4}>{this.props.auth.user.name}</Title>
            <Text type="secondary">@{this.props.auth.user.username}</Text>
          </div>
          <br />
          <br />
          <br />

          {/* Joined Trips Section */}
          <Title level={2}>Your Trips</Title>
          <div className="user-trips-block">
            <List
              itemLayout="horizontal"
              dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              renderItem={userTrip => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{userTrip}</Avatar>}
                    title={<a href="/#">Trip {userTrip}</a>}
                  />
                </List.Item>
              )}
            />
          </div>

          <br />
          <br />

          {/* Your Trips Section */}
          <Title level={2}>Joined Trips</Title>
          <div className="user-trips-block">
            <List
              itemLayout="horizontal"
              dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              renderItem={joinedTrip => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{joinedTrip}</Avatar>}
                    title={<a href="/#">Trip {joinedTrip}</a>}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Account);
