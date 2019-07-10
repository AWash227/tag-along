import React, { Component } from "react";
import { List, Button, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

// Props
// acceptRelationship
// notification

class FriendRequest extends Component {
  render() {
    return (
      <List.Item
        actions={[
          <Button
            shape="circle"
            type="primary"
            icon="like"
            onClick={() =>
              this.props.acceptRelationship(this.props.notification._id)
            }
          />,
          <Button
            shape="circle"
            type="primary"
            icon="dislike"
            onClick={() =>
              this.props.declineRelationship(this.props.notification._id)
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
              icon="user-add"
            />
          }
          title={
            <Text key={1}>
              {"Friend Request from: "}
              <Link
                key={2}
                to={`/user/${this.props.notification.requester.username}`}
              >
                {this.props.notification.requester.name}
              </Link>
            </Text>
          }
        />
      </List.Item>
    );
  }
}

export default FriendRequest;
