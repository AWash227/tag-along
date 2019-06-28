import React, { Component } from "react";
import {
  Card,
  Icon,
  Typography,
  Button,
  Avatar,
  Dropdown,
  Menu,
  Divider
} from "antd";
import TripFocus from "../layout/TripFocus";
import date from "date-and-time";
import { deleteTrip, getTrip, tagAlong } from "../../actions/tripActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Text, Title, Paragraph } = Typography;
/*
  title,
  startDate,
  endDate,
  description,
  owner,
*/

const DropdownMenu = props => {
  return (
    <Menu mode="vertical" selectable>
      {props.user === props.owner ? (
        <Menu.Item onClick={props.deleteTrip}>
          <Icon type="delete" />
          Delete Trip
        </Menu.Item>
      ) : (
        <div />
      )}
      <Menu.Divider />
      <Menu.Item>
        <Icon type="exclamation-circle" />
        Report Trip
      </Menu.Item>
      {console.log("USER PROP IS: ", props.user)}
      {console.log("OWNER PROP IS: ", props.owner)}
    </Menu>
  );
};

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false
    };
  }
  render() {
    const handleTripClick = tripId => {
      this.props.getTrip(tripId);
      this.props.history.push(`/trips/${tripId}`);
    };

    const handleTagAlongClick = (tripId, userId, ownerId) => {
      this.props.tagAlong(tripId, userId, ownerId);
    };

    const handleDropDownClick = () => {
      this.setState({
        dropDownOpen: !this.state.dropDownOpen
      });
    };

    return (
      <div className="Trip-Card">
        <Card
          size="small"
          title={[
            <Avatar
              key={1}
              src={this.props.owner.profilePicLink}
              className="trip-owner-avatar"
            />,
            <Paragraph key={2} className="trip-owner-name">
              <Link to={`/user/${this.props.owner.username}`}>
                <b>{this.props.owner.name}</b>
              </Link>
            </Paragraph>
          ]}
          extra={
            <Dropdown
              trigger={["click"]}
              visible={this.state.dropDownOpen}
              overlay={
                <DropdownMenu
                  deleteTrip={() => {
                    this.props.deleteTrip(this.props.id);
                    handleDropDownClick();
                  }}
                  user={this.props.user.id}
                  owner={this.props.owner._id}
                />
              }
            >
              <Icon onClick={handleDropDownClick} type="ellipsis" />
            </Dropdown>
          }
          actions={[
            [<Icon key={2} type="car" />, ` ${this.props.seats}`],
            <Button
              className="tag-along-btn"
              type="primary"
              icon="usergroup-add"
              ghost
              onClick={() =>
                handleTagAlongClick(
                  this.props.id,
                  this.props.auth.user.id,
                  this.props.owner._id
                )
              }
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
          <div
            className="trip-body"
            onClick={() => handleTripClick(this.props.id)}
          >
            <Title level={2} style={{ marginTop: 0 }}>
              {this.props.destination}
            </Title>
            <Paragraph>
              <b>
                {date.format(
                  new Date(this.props.startDate),
                  "ddd MMM D, h:mm A"
                )}
              </b>{" "}
              —{" "}
              <b>
                {date.format(new Date(this.props.endDate), "ddd MMM D, h:mm A")}
              </b>{" "}
            </Paragraph>
          </div>
          {/*
              <b>{this.props.seats}</b> seats available, and am going to{" "}
              <b>{this.props.destination}</b> from{" "}
              <b>
                {date.format(new Date(this.props.startDate), "ddd MMM D, h:mm A")}
              </b>{" "}
              —{" "}
              <b>
                {date.format(new Date(this.props.endDate), "ddd MMM D, h:mm A")}
              </b>{" "}
              Bring <b>${this.props.donation}</b> to cover gas.
              */}
        </Card>
      </div>
    );
  }
}

Trip.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  getTrip: PropTypes.func.isRequired,
  tagAlong: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTrip, getTrip, tagAlong }
)(Trip);
