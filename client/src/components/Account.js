import React, { Component } from "react";
import { Typography, Avatar, List, Tabs, Badge } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOwnedTrips } from "../actions/tripActions";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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

  componentDidMount = () => {
    // On mount, get the trips the user has
    this.props.getOwnedTrips(this.props.auth.user.id);
  };

  render() {
    return (
      <div>
        {/* Account Info Section */}
        <Title>Your Account</Title>
        <div id="surround-form">
          <div
            style={{
              width: "15%",
              marginTop: 15,
              display: "inline-block",
              verticalAlign: "top"
            }}
          >
            <Avatar
              style={{
                width: 50,
                height: 50
              }}
              src={this.props.auth.user.profilePicLink}
            />
          </div>
          <div className="account-names">
            <Title level={4}>{this.props.auth.user.name}</Title>

            <Text type="secondary">@{this.props.auth.user.username}</Text>
          </div>
          <br />
          <br />
          <br />

          <Tabs defaultActiveKey="1">
            <TabPane tab="Your Trips" key="1">
              {/* Joined Trips Section */}
              <div className="user-trips-block">
                <List
                  loading={this.props.trip.ownedTripsLoading}
                  itemLayout="horizontal"
                  dataSource={this.props.trip.ownedTrips}
                  renderItem={(userTrip, i) => (
                    <List.Item>
                      <Link
                        to={`/trips/${userTrip._id}`}
                        style={{ width: " 100%" }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Badge
                              dot
                              status={userTrip.active ? "success" : "default"}
                            >
                              <Avatar
                                style={
                                  i === 0
                                    ? { backgroundColor: "#1890ff" }
                                    : i === 1
                                    ? { backgroundColor: "#40a9ff" }
                                    : i === 2
                                    ? { backgroundColor: "#69c0ff" }
                                    : {}
                                }
                              >
                                {i + 1}
                              </Avatar>
                            </Badge>
                          }
                          title={
                            <div>
                              <Text strong>{userTrip.destination}</Text>
                            </div>
                          }
                        />
                      </Link>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
            <TabPane tab="Joined Trips" key="2">
              {/* Your Trips Section */}
              <div className="user-trips-block">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15
                  ]}
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
            </TabPane>
          </Tabs>

          <br />
          <br />
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  getOwnedTrips: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getOwnedTrips }
)(Account);
