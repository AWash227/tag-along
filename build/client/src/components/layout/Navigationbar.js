"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const prop_types_1 = require("prop-types");
const authActions_1 = require("../../actions/authActions");
const react_redux_1 = require("react-redux");
class Navigationbar extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            current: "home"
        };
        this.handleClick = e => {
            console.log("click ", e);
            this.setState({
                current: e.key
            });
        };
        this.onLogoutClick = e => {
            this.props.logoutUser();
        };
    }
    render() {
        return { this: .props.auth.isAuthenticated ? onClick = { this: .handleClick }
                :
            ,
            selectedKeys = { [this.state.current]:  },
            mode = "horizontal",
            className = "main-nav"
                >
                    key, "home":  >
                trigger };
        {
            window.innerWidth < 576 ? "focus" : "hover";
        }
        title = "Your Feed";
        placement = "top"
            >
                to;
        "/dashboard" >
            type;
        "home" /  >
            className;
        "nav-text" > Your;
        Feed < /div>
            < /Link>
            < /Tooltip>
            < /Menu.Item>
            < antd_1.Menu.Item;
        key = "notifications" >
            trigger;
        {
            window.innerWidth < 576 ? "focus" : "hover";
        }
        title = "Notifications";
        placement = "top"
            >
                to;
        "/notifications" >
            count;
        {
            3;
        }
         >
            type;
        "bell" /  >
            /Badge>
            < /Link>
            < /Tooltip>
            < /Menu.Item>
            < antd_1.Menu.Item;
        key = "trip-add" >
            trigger;
        {
            window.innerWidth < 576 ? "focus" : "hover";
        }
        title = "Add a Trip!";
        placement = "bottom"
            >
                to;
        "/trips/add" >
            className;
        "add-trip";
        type = "rocket" /  >
            className;
        "nav-text" > Add;
        Trip < /div>
            < /Link>
            < /Tooltip>
            < /Menu.Item>
            < antd_1.Menu.Item;
        key = "account" >
            trigger;
        {
            window.innerWidth < 576 ? "focus" : "hover";
        }
        title = "Your Account";
        placement = "top"
            >
                to;
        "/account" >
            type;
        "user" /  >
            className;
        "nav-text" > Account < /div>
            < /Link>
            < /Tooltip>
            < /Menu.Item>
            < antd_1.Menu.Item;
        onClick = { this: .onLogoutClick } >
            trigger;
        {
            window.innerWidth < 576 ? "focus" : "hover";
        }
        title = "Log Out"
            >
                type;
        "logout" /  >
            className;
        "nav-text" > Logout < /div>
            < /Tooltip>
            < /Menu.Item>
            < /Menu>;
        />;
    }
}
/div>;
;
Navigationbar.propTypes = {
    logoutUser: prop_types_1.default.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { logoutUser: authActions_1.logoutUser })(Navigationbar);
//# sourceMappingURL=Navigationbar.js.map