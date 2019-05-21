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
                      destination={trip.destination}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      seats={trip.seats}
                      donation={trip.donation}
                      owner={trip.owner}
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
