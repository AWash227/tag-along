import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Typography, Button, List} from 'antd';
import StackGrid from 'react-stack-grid';
import Trip from './Trip';

const { Title } = Typography;
let data = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
class Dashboard extends Component {
  
  onComponentMount = () => {
    console.log("Hello")
  }
  onLogoutClick = e  => {
    e.preventDefault();
    this.props.logoutUser(); 
  };
  render(){
    const { user } = this.props.auth;
    return(

      <div >
          <Button onClick={this.onLogoutClick} size="large" >Logout</Button>
          {/*
          <StackGrid columnWidth = {320}>
            {data.map((i) => {return <Trip />})}

          </StackGrid>
          */}
            <List
              grid={{
                gutter: 6, xs: 1, sm: 1, md: 2, xl: 3, xxl: 4
              }} 
              dataSource={data}
              renderItem={trip => (
                <List.Item>
                  <Trip />
                </List.Item>
              )}
            >

            </List>
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
