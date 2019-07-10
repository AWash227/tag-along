"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=errorReducer.js.map