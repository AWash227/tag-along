import React, { Component } from "react";
import { Card, Icon, Typography, Button, Avatar, Dropdown, Menu } from "antd";
import date from "date-and-time";
import { deleteTrip } from "../../actions/tripActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
/*
  title,
  startDate,
  endDate,
  description,
  owner,
*/

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

class Trip extends Component {
  render() {
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
              overlay={
                <DropdownMenu
                  deleteTrip={() => {
                    this.props.deleteTrip(this.props.id);
                  }}
                />
              }
            >
              <Icon type="ellipsis" />
            </Dropdown>
          }
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
          <Title level={3} style={{ marginTop: 0 }}>
            {this.props.destination}
          </Title>
          <Paragraph style={{ margin: 25, marginTop: 0 }}>
            <b>
              {date.format(new Date(this.props.startDate), "ddd MMM D, h:mm A")}
            </b>{" "}
            —{" "}
            <b>
              {date.format(new Date(this.props.endDate), "ddd MMM D, h:mm A")}
            </b>{" "}
          </Paragraph>
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
  deleteTrip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { deleteTrip }
)(Trip);
