import React, { Component } from "react";
import {
  Card,
  Icon,
  Button,
  Avatar,
  Collapse,
  Dropdown,
  Typography,
  Tooltip,
  Menu,
  Modal,
  List
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Attendees from "../Trip/Attendees";
import { deleteTrip, getTrip } from "../../actions/tripActions";
import date from "date-and-time";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const collapseStyling = {
  border: 0,
  background: "#f7f7f7"
};

const DropdownMenu = props => {
  return (
    <Menu mode="vertical">
      <Menu.Item onClick={props.deleteTrip}>
        <Icon type="delete" />
        Delete Trip
      </Menu.Item>
    </Menu>
  );
};

// props.id
// props.visible

class TripFocus extends Component {
  componentDidMount = () => {
    this.props.getTrip(this.props.id);
  };
  render() {
    return (
      <Modal
        className="trip-modal"
        visible={this.props.visible}
        onCancel={this.props.setTripModalClose}
        footer={null}
        maskClosable
        centered
      >
        <Card
          className="trip"
          loading={this.props.trip.tripLoading}
          title={[
            <Avatar
              key={1}
              src={this.props.trip.trip.owner.profilePicLink}
              className="trip-owner-avatar"
            />,
            <Paragraph key={2} className="trip-owner-name">
              <Link to={`/user/${this.props.trip.trip.owner.username}`}>
                <b>{this.props.trip.trip.owner.name}</b>
              </Link>
            </Paragraph>
          ]}
        >
          <Title level={2} style={{ marginTop: 0 }}>
            {this.props.trip.trip.destination}
          </Title>
          <Button
            size="large"
            type="primary"
            style={{ width: "100%", marginBottom: 25 }}
          >
            JOIN TRIP
          </Button>
          <Title level={3}>Details</Title>
          <div className="trip-details">
            <div className="trip-details-block">
              <Tooltip title="Date and Time">
                <Icon className="trip-details-icon" type="clock-circle" />
              </Tooltip>
              <Paragraph className="trip-details-desc">
                {date.isSameDay(
                  new Date(this.props.trip.trip.startDate),
                  new Date(this.props.trip.trip.endDate)
                ) ? (
                  <div>
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.startDate),
                        "MMM D, h:mm A"
                      )}
                    </b>
                    –
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.endDate),
                        "h:mm A"
                      )}
                    </b>
                  </div>
                ) : (
                  <div>
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.startDate),
                        "MMM D, h:mm A"
                      )}
                    </b>{" "}
                    —{" "}
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.endDate),
                        "MMM D, h:mm A"
                      )}
                    </b>{" "}
                  </div>
                )}
              </Paragraph>
            </div>
            <div className="trip-details-block">
              <Tooltip title="Requested Donation">
                <Icon className="trip-details-icon" type="dollar" />
              </Tooltip>
              <Paragraph className="trip-details-desc">
                Bring <b>${this.props.trip.trip.donation}</b> with you.
              </Paragraph>
            </div>
            <div className="trip-details-block">
              <Tooltip title="Seats Available">
                <Icon className="trip-details-icon" type="car" />
              </Tooltip>
              <Paragraph className="trip-details-desc">
                There are <b>{this.props.trip.trip.seats}</b> seats available
                for this trip.
              </Paragraph>
              <Attendees
                avatars={this.props.trip.trip.joined}
                seats={this.props.trip.trip.seats}
              />
            </div>
          </div>
        </Card>
      </Modal>
    );
  }
}

TripFocus.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  getTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { deleteTrip, getTrip }
)(TripFocus);
