import React, { Component } from "react";
import { Avatar, Button, List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

class TripRequest extends Component {
  render() {
    return (
      <List.Item
        actions={[
          <Button
            shape="circle"
            icon="like"
            type="primary"
            onClick={() =>
              this.props.acceptTripRelationship(this.props.notification._id)
            }
          />,
          <Button
            shape="circle"
            icon="dislike"
            type="primary"
            onClick={() =>
              this.props.declineTripRelationship(this.props.notification._id)
            }
          />
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              style={{
                backgroundImage: `url(${
                  this.props.notification.requester.profilePicLink
                })`,
                backgroundSize: "contain",
                backgroundColor: "rgb(150,150,150)",
                backgroundBlendMode: "multiply"
              }}
              icon="rocket"
            />
          }
          title={[
            <Text key={1}>
              <Link to={`/user/${this.props.notification.requester.username}`}>
                {this.props.notification.requester.name}
              </Link>
              {" has requested to join your trip to: "}
              <Link to={`/trips/${this.props.notification.trip._id}`}>
                {this.props.notification.trip.destination}
              </Link>
              {"."}
            </Text>
          ]}
        />
      </List.Item>
    );
  }
}

export default TripRequest;
