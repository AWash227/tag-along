import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Typography, Button, List, Layout} from 'antd';
import StackGrid from 'react-stack-grid';
import Trip from '../Trip/Trip';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
let data = [
  {
    title: 'Randolph College >> Virginia Tech',
    startDate: 'Aug 9',
    endDate: 'Aug 10',
    description: 'A trip to neverland!'
  },
  {
    title: 'Liberty University >> Kohls',
    startDate: 'Aug 9',
    endDate: 'Aug 10',
    description: 'A trip to Kohls to buy some clothes!'
  },
  {
    title: 'Randolph College >> Forest, VA',
    startDate: 'Aug 9',
    endDate: 'Aug 10',
    description: 'A trip home, you can tag along if you have family there too!'
  },
  {
    title: 'Randolph College >> Get Pizza',
    startDate: 'Aug 9',
    endDate: 'Aug 10',
    description: 'A trip to get pizza, since I am a hungry boi.'
  },
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
      <div>
        <Layout>
            <div>
            <List
              grid={{
                gutter: 16, xs: 1, sm: 2, md: 2, xl: 4, xxl: 4
              }} 
              dataSource={data}
              renderItem={trip => (
                <List.Item>
                  <Trip 
                    title={trip.title}
                    description={trip.description}
                    startDate={trip.startDate}
                    endDate={trip.endDate}

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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
