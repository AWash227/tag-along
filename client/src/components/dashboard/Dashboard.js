import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Typography, Button } from 'antd';

const { Title } = Typography;
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(); 
  };
  render(){
    const { user } = this.props.auth;
    return(
      <div id="surround-landing">
          <Button onClick={this.onLogoutClick} size="large" >Logout</Button>
      </div> 
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
