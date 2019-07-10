"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const reducers_1 = require("./reducers");
const initialState = {};
const middleware = [redux_thunk_1.default];
const store = redux_1.createStore(reducers_1.default, initialState, redux_1.compose(redux_1.applyMiddleware(...middleware)));
exports.default = store;
//# sourceMappingURL=store.js.map