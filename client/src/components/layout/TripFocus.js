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
  Modal
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTrip, getTrip } from "../../actions/tripActions";
import date from "date-and-time";

const { Title, Paragraph } = Typography;
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
        title={null}
        maskClosable
        confirmLoading
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
          actions={[
            [<Icon key={2} type="car" />, ` ${this.props.trip.trip.seats}`],
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
              ` ${this.props.trip.trip.donation}`
            ]
          ]}
          cover={<div className="cover-group" />}
        >
          <Title style={{ marginTop: 0 }}>
            {this.props.trip.trip.destination}
          </Title>
          <Collapse bordered={false} defaultActiveKey={"1"}>
            <Panel
              key="1"
              style={collapseStyling}
              header={<Title level={3}>Trip Details</Title>}
            >
              <div className="trip-details">
                <div className="trip-details-block">
                  <Tooltip title="Date and Time">
                    <Icon className="trip-details-icon" type="clock-circle" />
                  </Tooltip>
                  <Paragraph className="trip-details-desc">
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.startDate),
                        "ddd MMM D, h:mm A"
                      )}
                    </b>{" "}
                    —{" "}
                    <b>
                      {date.format(
                        new Date(this.props.trip.trip.endDate),
                        "ddd MMM D, h:mm A"
                      )}
                    </b>{" "}
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
                    There are <b>{this.props.trip.trip.seats}</b> seats
                    available for this trip.
                  </Paragraph>
                </div>
              </div>
            </Panel>
          </Collapse>
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
