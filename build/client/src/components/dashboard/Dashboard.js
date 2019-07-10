"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const authActions_1 = require("../../actions/authActions");
const tripActions_1 = require("../../actions/tripActions");
const antd_1 = require("antd");
const fuse_js_1 = require("fuse.js");
const Search = antd_1.Input.Search;
const { Title, Paragraph } = antd_1.Typography;
var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["destination", "owner.name"]
};
class Dashboard extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            trips: []
        };
    }
    componentDidMount() {
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
            var fuse = new fuse_js_1.default(this.props.trip.activeTrips, options);
            let searchresults = fuse.search(this.state.searchString);
            console.log(searchresults);
            this.props.changeSearchableTrips(searchresults);
        };
        return ({ this: .props.match.params.id ? visible = { this: .props.trip.tripModalOpen }
                :
            ,
            id = { this: .props.match.params.id },
            setTripModalClose = {}(), this: .props.setTripModal(false) }
            /  >
        );
        />;
    }
}
style;
{
    {
        backgroundColor: "#fff";
    }
}
 >
    style;
{
    {
        marginTop: 50;
    }
}
/>
    < Search;
onChange = { handleSearch };
value = { this: .state.searchString };
style = {};
{
    padding: 9;
}
placeholder = "Search for a Trip or Friend..."
    /  >
    className;
"surround-dash" >
    grid;
{
    {
        gutter: 16,
            xs;
        1,
            sm;
        2,
            md;
        2,
            xl;
        4,
            xxl;
        4;
    }
}
loading = { this: .props.trip.loading };
dataSource = { this: .props.trip.searchableTrips };
renderItem = { trip }(style, {}, { marginBottom: 4, marginTop: 4 },  >
    id, { trip, : ._id }, destination = { trip, : .destination }, startDate = { trip, : .startDate }, endDate = { trip, : .endDate }, seats = { trip, : .seats }, donation = { trip, : .donation }, owner = { trip, : .owner }, history = { this: .props.history }, tripActions_1.deleteTrip = { this: .props.deleteTrip }, tripActions_1.getTrip = { this: .props.getTrip }, tripActions_1.tagAlong = { this: .props.tagAlong }, user = { this: .props.auth.user }
    /  >
    /List.Item>);
/>
    < /div>
    < Paragraph;
style = {};
{
    paddingTop: 15, textAlign;
    "center";
}
 >
    That;
's all the trips for now... Add some more friends!
    < /Paragraph>
    < /Layout>;
{
}
/div>;
;
Dashboard.propTypes = {
    logoutUser: prop_types_1.default.func.isRequired,
    deleteTrip: prop_types_1.default.func.isRequired,
    getTrip: prop_types_1.default.func.isRequired,
    tagAlong: prop_types_1.default.func.isRequired,
    changeSearchableTrips: prop_types_1.default.func.isRequired,
    auth: prop_types_1.default.object.isRequired,
    trip: prop_types_1.default.object.isRequired,
    getTrips: prop_types_1.default.func.isRequired,
    setTripModal: prop_types_1.default.func.isRequired
};
Dashboard.defaultProps = {
    showTripOnOpen: false
};
const mapStateToProps = state => ({
    auth: state.auth,
    trip: state.trip
});
exports.default = react_redux_1.connect(mapStateToProps, {
    logoutUser: authActions_1.logoutUser,
    getTrips: tripActions_1.getTrips,
    getTrip: tripActions_1.getTrip,
    deleteTrip: tripActions_1.deleteTrip,
    tagAlong: tripActions_1.tagAlong,
    setTripModal: tripActions_1.setTripModal,
    changeSearchableTrips: tripActions_1.changeSearchableTrips
})(Dashboard);
//# sourceMappingURL=Dashboard.js.map