import React, { Component } from "react";
import { Typography, Avatar, List, Tabs, Badge } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOwnedTrips } from "../actions/tripActions";
import { Link } from "react-router-dom";

import UserTop from "./layout/UserTop";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

class Account extends Component {
  componentDidMount = () => {
    // On mount, get the trips the user has
    this.props.getOwnedTrips(this.props.auth.user.id);
  };

  render() {
    return (
      <div style={{ marginTop: 60 }}>
        <div id="surround-form">
          {/* Account Info Section */}
          <UserTop user={this.props.auth.user} editable={true} />
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
                  dataSource={[this.props.auth.user.joinedTrips]}
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
