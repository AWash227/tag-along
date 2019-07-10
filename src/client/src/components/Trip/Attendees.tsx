import * as React from "react";
import { Avatar, Icon, Typography, Tooltip } from "antd";

const { Title, Text } = Typography;
/*
  avatars // Array of avatars
  seats // Max amount of avatars
*/

class Attendees extends React.Component {
  render() {
    return (
      <div className="face-group">
        {this.props.avatars ? (
          <div>
            <Title level={3} style={{ marginBottom: 0 }}>
              Attending ({this.props.avatars.length}){" "}
            </Title>
            <br />

            {this.props.avatars.map(avatar => (
              <Tooltip
                arrowPointAtCenter
                title={avatar.name}
                placement="topLeft"
              >
                <Avatar
                  className="face-group-avatar"
                  src={avatar.profilePicLink}
                />
              </Tooltip>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Attendees;
