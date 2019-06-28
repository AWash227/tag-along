import React, { Component } from "react";
import { Col, Row, Avatar, Typography, Button } from "antd";
import Statistic from "../microcomponents/Statistic";

const { Title, Text, Paragraph } = Typography;

/*
  Props
  User (Name, ProfilePicLink)
  ? editable ?
*/

class UserTop extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Avatar
              style={{ width: "90%", height: "90%" }}
              src={this.props.user.profilePicLink}
            />
          </Col>
          <Col span={18}>
            <div>
              <Row>
                <Col span={8}>
                  <Statistic
                    number={this.props.user.trips.length}
                    string={"trips"}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    number={this.props.user.friends.length}
                    string={"friends"}
                  />
                </Col>
                <Col span={8}>
                  <Statistic number={3} string={"seats"} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={24}>
                  {this.props.editable ? (
                    <Button style={{ width: "100%" }}>Edit Profile</Button>
                  ) : (
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={this.props.buttonClick}
                    >
                      Add Friend
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Text>
              <b>{this.props.user.name}</b>
            </Text>
            <br />
            <Text type="secondary">@{this.props.user.username}</Text>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserTop;
