import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Tooltip } from 'antd';

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
      </Menu>
    ) 
  } 
}

export default Navigationbar;
