import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  getTrips,
  setTripModal,
  changeSearchableTrips,
  deleteTrip,
  getTrip,
  tagAlong
} from "../../actions/tripActions";
import { Typography, List, Layout, Input } from "antd";
import Trip from "../Trip/Trip";
import TripFocus from "../layout/TripFocus";
import Fuse from "fuse.js";

const Search = Input.Search;
const { Title, Paragraph } = Typography;

var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["destination", "owner.name"]
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      trips: []
    };
  }
  componentDidMount() {
    // Get all viewable posts

    if (this.props.showTripOnOpen) {
      this.props.setTripModal(true);
    }
    this.props.getTrips(this.props.auth.user.id);
  }

  render() {
    const handleSearch = event => {
      this.setState({
        searchString: event.target.value
      });
      var fuse = new Fuse(this.props.trip.activeTrips, options);
      let searchresults = fuse.search(this.state.searchString);
      console.log(searchresults);
      this.props.changeSearchableTrips(searchresults);
    };

    return (
      <div>
        {this.props.match.params.id ? (
          <TripFocus
            visible={this.props.trip.tripModalOpen}
            id={this.props.match.params.id}
            setTripModalClose={() => this.props.setTripModal(false)}
          />
        ) : (
          <div />
        )}
        <Layout style={{ backgroundColor: "#fff" }}>
          <div style={{ marginTop: 50 }} />
          <Search
            onChange={handleSearch}
            value={this.state.searchString}
            style={{ padding: 9 }}
            placeholder="Search for a Trip or Friend..."
          />
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
              dataSource={this.props.trip.searchableTrips}
              renderItem={trip => (
                <List.Item style={{ marginBottom: 4, marginTop: 4 }}>
                  <Trip
                    id={trip._id}
                    destination={trip.destination}
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                    seats={trip.seats}
                    donation={trip.donation}
                    owner={trip.owner}
                    history={this.props.history}
                    deleteTrip={this.props.deleteTrip}
                    getTrip={this.props.getTrip}
                    tagAlong={this.props.tagAlong}
                    user={this.props.auth.user}
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
  deleteTrip: PropTypes.func.isRequired,
  getTrip: PropTypes.func.isRequired,
  tagAlong: PropTypes.func.isRequired,
  changeSearchableTrips: PropTypes.func.isRequired,
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

  {
    logoutUser,
    getTrips,
    getTrip,
    deleteTrip,
    tagAlong,
    setTripModal,
    changeSearchableTrips
  }
)(Dashboard);
