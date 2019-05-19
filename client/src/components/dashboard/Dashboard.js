import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {getTrips} from '../../actions/tripActions';
import { Typography, Button, List, Layout, Input} from 'antd';
import Trip from '../Trip/Trip';

const Search = Input.Search;
const {Title, Paragraph} = Typography;

class Dashboard extends Component {
  
  componentDidMount(){
    this.props.getTrips();
  }
  onLogoutClick = e  => {
    e.preventDefault();
    this.props.logoutUser(); 
  };
  render(){
    const { user } = this.props.auth;
    return(
      <div>
        <Title> Trips for you </Title>
        <Layout style={{backgroundColor: "#fff"}}>

            <Search style={{padding: 9}} placeholder="Search..."></Search>
            <div className="surround-dash" >
              <List
                grid={{
                  gutter: 16, xs: 1, sm: 2, md: 2, xl: 4, xxl: 4
                }} 
                dataSource={this.props.trip.trips}
                renderItem={trip => (
                  <List.Item>
                    <Trip 
                      id={trip.id}
                      location1={trip.location1}
                      location2={trip.location2}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      seats={trip.seats}
                      donation={trip.donation}
                  />
                  </List.Item>
                )}
              >

              </List>
            </div>

        </Layout>
          <Button onClick={this.onLogoutClick} size="large" >Logout</Button>
          {/*
          <StackGrid columnWidth = {320}>
            {data.map((i) => {return <Trip />})}

          </StackGrid>
          */}
      </div> 
      
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getTrips: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { logoutUser, getTrips }
)(Dashboard);
