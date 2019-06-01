import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getTrips, setTripModal } from "../../actions/tripActions";
import { Typography, List, Layout, Input } from "antd";
import Trip from "../Trip/Trip";
import TripFocus from "../layout/TripFocus";

const Search = Input.Search;
const { Title, Paragraph } = Typography;

class Dashboard extends Component {
  componentDidMount = () => {
    if (this.props.showTripOnOpen) {
      this.props.setTripModal(true);
    }
    this.props.getTrips(this.props.auth.user.id);
  };

  render() {
    return (
      <div>
        <TripFocus
          visible={this.props.trip.tripModalOpen}
          id={this.props.match.params.id}
          setTripModalClose={() => this.props.setTripModal(false)}
        />
        <Title>Trips for you</Title>
        <Layout style={{ backgroundColor: "#fff" }}>
          <Search style={{ padding: 9 }} placeholder="Search..." />
          <div className="surround-dash">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                xl: 4,
                xxl: 4
              }}
              loading={this.props.trip.loading}
              dataSource={this.props.trip.trips}
              renderItem={trip => (
                <List.Item>
                  <Trip
                    id={trip._id}
                    destination={trip.destination}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    seats={trip.seats}
                    donation={trip.donation}
                    owner={trip.owner}
                    history={this.props.history}
                  />
                </List.Item>
              )}
            />
          </div>
          <Paragraph style={{ paddingTop: 15, textAlign: "center" }}>
            That's all the trips for now... Add some more friends!
          </Paragraph>
        </Layout>
        {/*
          <StackGrid columnWidth = {320}>
            {data.map((i) => {return <Trip />})}

          </StackGrid>
          */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
  getTrips: PropTypes.func.isRequired,
  setTripModal: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  showTripOnOpen: false
};

const mapStateToProps = state => ({
  auth: state.auth,
  trip: state.trip
});

export default connect(
  mapStateToProps,

  { logoutUser, getTrips, setTripModal }
)(Dashboard);
