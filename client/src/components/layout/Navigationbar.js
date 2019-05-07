import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Navigationbar extends Component {
  state = {
   current: 'dashboard',
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
          <Menu.Item key='dashboard'>
            <Link to='/'>
              <Icon type='dashboard' />
            </Link>
          </Menu.Item> 
      </Menu>
    ) 
  } 
}

export default Navigationbar;
