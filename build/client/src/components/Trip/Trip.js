"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const date_and_time_1 = require("date-and-time");
const tripActions_1 = require("../../actions/tripActions");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const { Text, Title, Paragraph } = antd_1.Typography;
const DropdownMenu = props => {
    return mode = "vertical";
    selectable >
        { props, : .user === props.owner ? onClick = { props, : .deleteTrip } >
                type : , "delete": />,
            Delete
        } / antd_1.Menu.Item >
    ;
};
/>;
/>
    < antd_1.Menu.Item >
    type;
"exclamation-circle" /  >
    Report;
Trip
    < /Menu.Item>;
{
    console.log("USER PROP IS: ", props.user);
}
{
    console.log("OWNER PROP IS: ", props.owner);
}
/Menu>;
;
;
class Trip extends react_1.Component {
    constructor(props) {
        super(props);
        this.extra = {}
            < antd_1.Dropdown;
        this.trigger = { ["click"]:  };
        this.visible = { this: .state.dropDownOpen };
        this.overlay = {}
            < DropdownMenu;
        this.deleteTrip = {}();
        this.state = {
            dropDownOpen: false
        };
    }
    render() {
        const handleTripClick = tripId => {
            this.props.getTrip(tripId);
            this.props.history.push(`/trips/${tripId}`);
        };
        const handleTagAlongClick = (tripId, userId, ownerId) => {
            this.props.tagAlong(tripId, userId, ownerId);
        };
        const handleDropDownClick = () => {
            this.setState({
                dropDownOpen: !this.state.dropDownOpen
            });
        };
        return className = "Trip-Card" >
            size;
        "small";
        title = { [key]:  = { 1:  },
            src = { this: .props.owner.profilePicLink },
            className = "trip-owner-avatar"
                /  > , }
            < Paragraph;
        key = { 2:  };
        className = "trip-owner-name" >
            to;
        {
            `/user/${this.props.owner.username}`;
        }
         >
            { this: .props.owner.name } < /b>
            < /Link>
            < /Paragraph>;
    }
}
{
    this.props.deleteTrip(this.props.id);
    handleDropDownClick();
}
user = { this: .props.user.id };
owner = { this: .props.owner._id }
    /  >
;
    >
        onClick;
{
    handleDropDownClick;
}
type = "ellipsis" /  >
    /Dropdown>;
actions = { [([key, { 2:  }, type = "car" /  > , ` ${this.props.seats}`],
        className)]:  = "tag-along-btn",
    type = "primary",
    icon = "usergroup-add",
    ghost,
    onClick = {}(),
    : .props.id,
    this: .props.auth.user.id,
    this: .props.owner._id
}
    >
        Tag;
Along
    < /Button>,[className];
"donation";
key = { 3:  };
type = "dollar" /  > ,
    ` ${this.props.donation}`;
cover = {} < div;
className = "cover-group" /  > ;
hoverable
    >
        className;
"trip-body";
onClick = {}();
handleTripClick(this.props.id);
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
    { this: .props.destination }
    < /Title>
    < Paragraph >
    { date: date_and_time_1.default, : .format(new Date(this.props.startDate), "ddd MMM D, h:mm A") }
    < /b>{" "};
{
    " ";
}
({ date: date_and_time_1.default, : .format(new Date(this.props.endDate), "ddd MMM D, h:mm A") }
    < /b>{" "}
    < /Paragraph>
    < /div>);
{
}
/Card>
    < /div>;
;
Trip.propTypes = {
    deleteTrip: prop_types_1.default.func.isRequired,
    getTrip: prop_types_1.default.func.isRequired,
    tagAlong: prop_types_1.default.func.isRequired,
    auth: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    trip: state.trip,
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { deleteTrip: tripActions_1.deleteTrip, getTrip: tripActions_1.getTrip, tagAlong: tripActions_1.tagAlong })(Trip);
//# sourceMappingURL=Trip.js.map