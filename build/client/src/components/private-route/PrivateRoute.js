"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_redux_1 = require("react-redux");
const prop_types_1 = require("prop-types");
const PrivateRoute = (_a) => {
    var { component: Component, auth } = _a, rest = tslib_1.__rest(_a, ["component", "auth"]);
    return (Object.assign({}, rest));
};
render = { props,
    auth, : .isAuthenticated === true ? (Object.assign({}, props) /  >
    ) : to = '/login' /  >
}
    /  >
;
;
PrivateRoute.propTypes = {
    auth: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps)(PrivateRoute);
//# sourceMappingURL=PrivateRoute.js.map