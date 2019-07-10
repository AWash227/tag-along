"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const authReducer_1 = require("./authReducer");
const errorReducer_1 = require("./errorReducer");
const tripReducer_1 = require("./tripReducer");
const userReducer_1 = require("./userReducer");
exports.default = redux_1.combineReducers({
    auth: authReducer_1.default,
    errors: errorReducer_1.default,
    trip: tripReducer_1.default,
    user: userReducer_1.default
});
//# sourceMappingURL=index.js.map