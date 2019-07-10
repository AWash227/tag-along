import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Icon, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
class MobileTopNav extends Component {
  render() {
    return (
      <Menu
        className="mobile-top-nav"
        mode="horizontal"
        style={{ textAlign: "center" }}
      >
        <Menu.Item
          key="back"
          onClick={() => {
            window.history.back();
          }}
          style={{ float: "left", textAlign: "center" }}
        >
          <Icon type="left" />
        </Menu.Item>
        <Menu.Item key="Title">
          <Link to="/dashboard">
            <Title style={{ paddingLeft: 0, marginLeft: 0 }} level={4}>
              Tag Along
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="account"
          style={{ float: "right", textAlign: "center" }}
        >
          <Link to={"/account"}>
            <Avatar src={this.props.auth.user.profilePicLink} />
          </Link>
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
