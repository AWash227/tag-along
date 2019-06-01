import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Badge, Tooltip } from "antd";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";

class Navigationbar extends Component {
  state = {
    current: "home"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
  onLogoutClick = e => {
    this.props.logoutUser();
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        className="main-nav"
      >
        <Menu.Item key="home">
          <Tooltip title="Your Feed" placement="top">
            <Link to="/dashboard">
              <Icon type="home" />
              <div className="nav-text">Your Feed</div>
            </Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="notifications">
          <Tooltip title="Notifications" placement="top">
            <Link to="/notifications">
              <Badge count={3}>
                <Icon type="bell" />
              </Badge>
            </Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="trip-add">
          <Tooltip title="Add a Trip!" placement="top">
            <Link to="/trips/add">
              <Icon className="add-trip" type="rocket" />
              <div className="nav-text"> Add Trip</div>
            </Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="account">
          <Tooltip title="Your Account" placement="top">
            <Link to="/account">
              <Icon type="user" />
              <div className="nav-text">Account</div>
            </Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item onClick={this.onLogoutClick}>
          <Icon type="logout" />
          <div className="nav-text">Logout</div>
        </Menu.Item>
      </Menu>
    );
  }
}

Navigationbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigationbar);
