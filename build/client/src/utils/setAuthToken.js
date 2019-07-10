"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const setAuthToken = (token) => {
    if (token) {
        axios_1.default.defaults.headers.common["Authorization"] = token;
    }
    else {
        delete axios_1.default.defaults.headers.common["Authorization"];
    }
};
exports.default = setAuthToken;
//# sourceMappingURL=setAuthToken.js.map