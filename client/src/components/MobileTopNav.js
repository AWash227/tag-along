import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Icon, Avatar, Typography } from "antd";

const { Title } = Typography;
class MobileTopNav extends Component {
  render() {
    return (
      <Menu
        className="mobile-top-nav"
        mode="horizontal"
        style={{ textAlign: "center" }}
      >
        <Menu.Item key="Title" style={{ marginLeft: 50 }}>
          <b>Tag Along</b>
        </Menu.Item>
        <Menu.Item
          key="account"
          style={{ float: "right", textAlign: "center" }}
        >
          <Avatar src={this.props.auth.user.profilePicLink} />
        </Menu.Item>
      </Menu>
    );
  }
}

MobileTopNav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MobileTopNav);
