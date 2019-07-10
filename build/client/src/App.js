"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const history_1 = require("./history");
const jwt_decode_1 = require("jwt-decode");
const setAuthToken_1 = require("./utils/setAuthToken");
const authActions_1 = require("./actions/authActions");
const date_and_time_1 = require("date-and-time");
const store_1 = require("./store");
const antd_1 = require("antd");
const Landing_1 = require("./components/layout/Landing");
const Dashboard_1 = require("./components/dashboard/Dashboard");
const Account_1 = require("./components/Account");
const UserAccount_1 = require("./components/layout/UserAccount");
const Notifications_1 = require("./components/layout/Notifications/Notifications");
const MobileTopNav_1 = require("./components/MobileTopNav");
const Register_1 = require("./components/auth/Register");
const Login_1 = require("./components/auth/Login");
const TripFormBasic_1 = require("./components/Trip/TripFormBasic");
const { Content } = antd_1.Layout;
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken_1.default(token);
    const decoded = jwt_decode_1.default(token);
    store_1.default.dispatch(authActions_1.setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store_1.default.dispatch(authActions_1.logoutUser());
        window.location.href = "./login";
    }
}
function App() {
    date_and_time_1.default.setLocales("en", {
        A: ["AM", "PM"]
    });
    return store_1.default = { store: store_1.default } >
        history_1.default;
    {
        history_1.default;
    }
     >
        className;
    "App" >
        className;
    "app-content" /  >
        />
        < MobileTopNav_1.default /  >
        exact;
    path = "/";
    component = { Landing: Landing_1.default } /  >
        exact;
    path = "/register";
    component = { Register: Register_1.default } /  >
        exact;
    path = "/login";
    component = { Login: Login_1.default } /  >
        path;
    "/user/:username";
    component = { UserAccount: UserAccount_1.default } /  >
        exact;
    path = "/dashboard";
    component = { Dashboard: Dashboard_1.default };
    history_1.default = { history: history_1.default }
        /  >
        exact;
    path = "/trips/add";
    component = { TripForm: TripFormBasic_1.default } /  >
        exact;
    path = "/trips/:id";
    component = { Dashboard: Dashboard_1.default };
    showTripOnOpen = { true:  };
    history_1.default = { history: history_1.default }
        /  >
        exact;
    path = "/account";
    component = { Account: Account_1.default } /  >
        exact;
    path = "/notifications";
    component = { Notifications: Notifications_1.default }
        /  >
        /Switch>
        < /div>
        < /Router>
        < /Provider>;
    ;
}
exports.default = App;
//# sourceMappingURL=App.js.map