"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const is_empty_1 = require("is-empty");
const initialState = {
    user: {},
    notifications: []
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_USER:
            if (!is_empty_1.default(action.payload)) {
                return Object.assign({}, state, { user: action.payload });
            }
            else {
                break;
            }
        case types_1.ADD_USER_TO_TRIP:
            return {
                state
            };
        case types_1.GET_NOTIFICATIONS:
            return Object.assign({}, state, { notifications: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=userReducer.js.map