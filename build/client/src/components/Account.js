"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const tripActions_1 = require("../actions/tripActions");
const UserTop_1 = require("./layout/UserTop");
const { Title, Text } = antd_1.Typography;
const { TabPane } = antd_1.Tabs;
class Account extends react_1.Component {
    constructor() {
        super(...arguments);
        this.componentDidMount = () => {
            this.props.getOwnedTrips(this.props.auth.user.id);
        };
    }
    render() {
        return style = {};
        {
            marginTop: 60;
        }
    }
}
 >
    id;
"surround-form" >
    {}
    < UserTop_1.default;
user = { this: .props.auth.user };
editable = { true:  } /  >
    defaultActiveKey;
"1" >
    tab;
"Your Trips";
key = "1" >
    {}
    < div;
className = "user-trips-block" >
    loading;
{
    this.props.trip.ownedTripsLoading;
}
itemLayout = "horizontal";
dataSource = { this: .props.trip.ownedTrips };
renderItem = {}(userTrip, i);
to = {} `/trips/${userTrip._id}`;
style = {};
{
    width: " 100%";
}
    >
        avatar;
{
    dot;
    status = { userTrip, : .active ? "success" : "default" }
        >
            style;
    {
        i === 0
            ? { backgroundColor: "#1890ff" }
            : i === 1
                ? { backgroundColor: "#40a9ff" }
                : i === 2
                    ? { backgroundColor: "#69c0ff" }
                    : {};
    }
        >
            { i } + 1;
}
/Avatar>
    < /Badge>;
title = {}
    < div >
    strong > { userTrip, : .destination } < /Text>
    < /div>;
/>
    < /Link>
    < /List.Item>;
/>
    < /div>
    < /TabPane>
    < TabPane;
tab = "Joined Trips";
key = "2" >
    {}
    < div;
className = "user-trips-block" >
    itemLayout;
"horizontal";
dataSource = { [this.props.auth.user.joinedTrips]:  };
renderItem = {}(userTrip, i);
to = {} `/trips/${userTrip._id}`;
style = {};
{
    width: " 100%";
}
    >
        avatar;
{
    dot;
    status = { userTrip, : .active ? "success" : "default" }
        >
            style;
    {
        i === 0
            ? { backgroundColor: "#1890ff" }
            : i === 1
                ? { backgroundColor: "#40a9ff" }
                : i === 2
                    ? { backgroundColor: "#69c0ff" }
                    : {};
    }
        >
            { i } + 1;
}
/Avatar>
    < /Badge>;
title = {}
    < div >
    strong > { userTrip, : .destination } < /Text>
    < /div>;
/>
    < /Link>
    < /List.Item>;
/>
    < /div>
    < /TabPane>
    < /Tabs>
    < br /  >
    />
    < /div>
    < /div>;
;
Account.propTypes = {
    getOwnedTrips: prop_types_1.default.func.isRequired,
    auth: prop_types_1.default.object.isRequired,
    trip: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    trip: state.trip
});
exports.default = react_redux_1.connect(mapStateToProps, { getOwnedTrips: tripActions_1.getOwnedTrips })(Account);
//# sourceMappingURL=Account.js.map