import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Avatar, Tooltip} from 'antd';

class UserGroup extends Component {

  render(){
    const userFaces = this.props.users.map((user) => {
      return(
        <Tooltip trigger="click" title={user.name}>
          <Avatar className="face-group-avatar" src={user.profilePicLink} /> 
        </Tooltip>
      )
    })
    return(
      <div className="face-group">
          <div style={{marginTop: 10, marginBottom: 10}}>
          {userFaces}
          </div>
      </div>
    )
  }
}

UserGroup.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
};

export default UserGroup;