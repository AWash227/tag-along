"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const Attendees_1 = require("../Trip/Attendees");
const tripActions_1 = require("../../actions/tripActions");
const date_and_time_1 = require("date-and-time");
const { Title, Paragraph, Text } = antd_1.Typography;
const { Panel } = antd_1.Collapse;
const collapseStyling = {
    border: 0,
    background: "#f7f7f7"
};
const DropdownMenu = props => {
    return mode = "vertical" >
        onClick;
    {
        props.deleteTrip;
    }
     >
        type;
    "delete" /  >
        Delete;
    Trip
        < /Menu.Item>
        < /Menu>;
};
;
;
class TripFocus extends react_1.Component {
    constructor() {
        super(...arguments);
        this.componentDidMount = () => {
            this.props.getTrip(this.props.id);
        };
    }
    render() {
        return className = "trip-modal";
        visible = { this: .props.visible };
        onCancel = { this: .props.setTripModalClose };
        footer = { null:  };
        maskClosable;
        centered
            >
                className;
        "trip";
        loading = { this: .props.trip.tripLoading };
        title = { [key]:  = { 1:  },
            src = { this: .props.trip.trip.owner.profilePicLink },
            className = "trip-owner-avatar"
                /  > , }
            < Paragraph;
        key = { 2:  };
        className = "trip-owner-name" >
            to;
        {
            `/user/${this.props.trip.trip.owner.username}`;
        }
         >
            { this: .props.trip.trip.owner.name } < /b>
            < /Link>
            < /Paragraph>;
    }
}
    >
        level;
{
    2;
}
style = {};
{
    marginTop: 0;
}
 >
    { this: .props.trip.trip.destination }
    < /Title>
    < antd_1.Button;
size = "large";
type = "primary";
style = {};
{
    width: "100%", marginBottom;
    25;
}
    >
        JOIN;
TRIP
    < /Button>
    < Title;
level = { 3:  } > Details < /Title>
    < div;
className = "trip-details" >
    className;
"trip-details-block" >
    title;
"Date and Time" >
    className;
"trip-details-icon";
type = "clock-circle" /  >
    /Tooltip>
    < Paragraph;
className = "trip-details-desc" >
    { date: date_and_time_1.default, : .isSameDay(new Date(this.props.trip.trip.startDate), new Date(this.props.trip.trip.endDate)) ? ({ date: date_and_time_1.default, : .format(new Date(this.props.trip.trip.startDate), "MMM D, h:mm A") }
            < /b>)
            :
    }
    < b >
    { date: date_and_time_1.default, : .format(new Date(this.props.trip.trip.endDate), "h:mm A") }
    < /b>
    < /div>;
({ date: date_and_time_1.default, : .format(new Date(this.props.trip.trip.startDate), "MMM D, h:mm A") }
    < /b>{" "});
{
    " ";
}
({ date: date_and_time_1.default, : .format(new Date(this.props.trip.trip.endDate), "MMM D, h:mm A") }
    < /b>{" "}
    < /div>);
/Paragraph>
    < /div>
    < div;
className = "trip-details-block" >
    title;
"Requested Donation" >
    className;
"trip-details-icon";
type = "dollar" /  >
    /Tooltip>
    < Paragraph;
className = "trip-details-desc" >
    Bring < b > $;
{
    this.props.trip.trip.donation;
}
/b> with you.
    < /Paragraph>
    < /div>
    < div;
className = "trip-details-block" >
    title;
"Seats Available" >
    className;
"trip-details-icon";
type = "car" /  >
    /Tooltip>
    < Paragraph;
className = "trip-details-desc" >
    There;
are < b > { this: .props.trip.trip.seats } < /b> seats available;
for (this; trip.
    < /Paragraph>
    < Attendees_1.default; avatars = { this: .props.trip.trip.joined })
    seats = { this: .props.trip.trip.seats }
        /  >
        /div>
        < /div>
        < /Card>
        < /Modal>;
;
TripFocus.propTypes = {
    deleteTrip: prop_types_1.default.func.isRequired,
    getTrip: prop_types_1.default.func.isRequired,
    trip: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    trip: state.trip
});
exports.default = react_redux_1.connect(mapStateToProps, { deleteTrip: tripActions_1.deleteTrip, getTrip: tripActions_1.getTrip })(TripFocus);
//# sourceMappingURL=TripFocus.js.map