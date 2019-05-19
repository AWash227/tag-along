import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Tooltip, Badge } from 'antd';

class Navigationbar extends Component {
  state = {
   current: 'home',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key, 
    }) 
  }
  render(){
    return(
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]} 
        mode="horizontal"
      >
          <Menu.Item key='home'>
            <Link to='/dashboard'>
                <Icon type='home' /><div className="nav-text">Your Feed</div>
            </Link>
          </Menu.Item> 
          <Menu.Item key='notifications'>
            <Badge count={3}>
              <Icon type='bell'/> 
            </Badge>
          </Menu.Item>
          <Menu.Item key='trip-add'>
            <Link to='/trips/add'>
              <Icon className="add-trip" type='plus-circle' /><div className="nav-text"> Add Trip</div>
            </Link> 
          </Menu.Item>
          <Menu.Item key='account'>
            <Link to='/account'>
              <Icon type='user'/><div className="nav-text">Account</div>
            </Link> 
          </Menu.Item>
          <Menu.Item >
            <Link to='/logout'>
              <Icon type='logout' /><div className="nav-text">Logout</div>
            </Link> 
          </Menu.Item>
      </Menu>
    ) 
  } 
}

export default Navigationbar;
