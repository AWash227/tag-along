"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const isEmpty = require("is-empty");
exports.authInitialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};
function default_1(state = exports.authInitialState, action) {
    switch (action.type) {
        case types_1.SET_CURRENT_USER:
            return Object.assign({}, state, { isAuthenticated: !isEmpty(action.payload), user: action.payload });
        case types_1.USER_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=authReducer.js.map