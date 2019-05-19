import React, { Component } from "react";
import {
  Card,
  Icon,
  Typography,
  Carousel,
  Button,
  Tag,
  Dropdown,
  Menu,
  Divider,
  Tooltip,
  Avatar
} from "antd";
import UserGroup from "./UserGroup";
import date from "date-and-time";
import { deleteTrip } from "../../actions/tripActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { Title, Text, Paragraph } = Typography;
/*
  title,
  startDate,
  endDate,
  description,
  owner,
*/
const tripAttendees = [
  {
    name: "Andrew Washburn",
    profilePicLink:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/13344686_1782719515290750_5895247083997579600_n.jpg?_nc_cat=107&_nc_ht=scontent-iad3-1.xx&oh=595759942d5da7ee9f88edfbd5941849&oe=5D51BE81"
  },
  {
    name: "Michaela Washburn",
    profilePicLink:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/47571735_10217321771303882_8118360188060172288_n.jpg?_nc_cat=101&_nc_ht=scontent-iad3-1.xx&oh=df6e0947bd77635f90697083ca4e119d&oe=5D561DC2"
  },
  {
    name: "Luke Rogers",
    profilePicLink:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/52759732_2172137046206293_4112180338355077120_n.jpg?_nc_cat=103&_nc_ht=scontent-iad3-1.xx&oh=b1dd6670fd060e421612dd5e4c2e8aec&oe=5D656621"
  },
  {
    name: "Kyle Childress",
    profilePicLink:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/p160x160/35481242_104813663757908_7785468152099373056_n.jpg?_nc_cat=106&_nc_ht=scontent-iad3-1.xx&oh=51f886f66263ff04817926ee48b1dcee&oe=5D5398A5"
  },
  {
    name: "Melissa Schmidt",
    profilePicLink:
      "https://scontent-iad3-1.cdninstagram.com/vp/eb4dfbd741ef0637ffd2c5465747c118/5D7468C0/t51.2885-19/s150x150/45806871_615411028917434_7232424549336219648_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com"
  }
];

class Trip extends Component {
  render() {
    return (
      <div className="Trip-Card">
        <Card
          size="small"
          extra={<Icon type="ellipsis" />}
          actions={[
            [<Icon key={2} type="car" />, ` ${this.props.seats}`],
            <Button
              className="tag-along-btn"
              type="primary"
              icon="usergroup-add"
              ghost
            >
              Tag Along!
            </Button>,
            [
              <Icon className="donation" key={3} type="dollar" />,
              ` ${this.props.donation}`
            ]
          ]}
          cover={<div className="cover-group" />}
          hoverable
        >
        <Paragraph className="trip-content">
          <Title level={3}>{this.props.location2}</Title>
          I have <b>{this.props.seats}</b> seats available, and am going to{" "}
          <b>{this.props.location2}</b> from{" "}
          <b>
            {date.format(new Date(this.props.startDate), "ddd MMM D, h:mm A")}
          </b>{" "}
          —{" "}
          <b>
            {date.format(new Date(this.props.endDate), "ddd MMM D, h:mm A")}
          </b> Bring <b>${this.props.donation}</b> to cover gas.
        </Paragraph>
        <br />
          <Avatar
            key={1}
            className="trip-owner-avatar"
            src={tripAttendees[0].profilePicLink}
          />
          <Paragraph key={2} className="trip-owner-name">
            <b>{tripAttendees[0].name}</b>
          </Paragraph>
        </Card>
      </div>
    );
  }
}

Trip.propTypes = {
  deleteTrip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { deleteTrip }
)(Trip);
