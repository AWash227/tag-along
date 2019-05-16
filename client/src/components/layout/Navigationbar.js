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
                <Icon type='home' />Your Feed
            </Link>
          </Menu.Item> 
          <Menu.Item key='trip-add'>
            <Link to='/trips/add'>
              <Icon type='plus-circle' /> Add Trip
            </Link> 
          </Menu.Item>
          <Menu.Item style={{float: 'right'}}>
            <Link to='/logout'>
              <Icon type='logout' /> Logout
            </Link> 
          </Menu.Item>
          <Menu.Item style={{float: 'right', paddingRight: 5}} key='account'>
            <Link to='/account'>
              <Icon type='user' style={{fontSize: 16}}/> Account
            </Link> 
          </Menu.Item>
          <Menu.Item style={{float: 'right', paddingRight: 5}} key='notifications'>
            <Badge count={99}>
              <Icon type='bell' style={{fontSize: 16}}/> 
            </Badge>
          </Menu.Item>
      </Menu>
    ) 
  } 
}

export default Navigationbar;
