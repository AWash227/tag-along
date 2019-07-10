"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const setAuthToken_1 = require("../utils/setAuthToken");
const jwt_decode = require("jwt-decode");
const history_1 = require("../history");
const types_1 = require("./types");
const types_2 = require("../types");
exports.registerUser = (userData, history) => (dispatch) => {
    console.log("registering user");
    axios_1.default.post("/api/users/register", userData)
        .then(res => {
        console.log(res);
        history.push("/login");
    })
        .catch(err => dispatch({
        type: types_1.GET_ERRORS,
        payload: err.response.data
    }));
};
exports.loginUser = (userData) => (dispatch) => {
    axios_1.default.post("/api/users/login", userData)
        .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken_1.default(token);
        const decoded = jwt_decode(token);
        dispatch(exports.setCurrentUser(decoded));
    })
        .catch((err) => {
        if (err.response) {
            dispatch({
                type: types_1.GET_ERRORS,
                payload: err.response.data
            });
        }
    });
};
exports.setCurrentUser = (decoded) => {
    return {
        type: types_1.SET_CURRENT_USER,
        payload: decoded
    };
};
exports.setUserLoading = () => {
    return {
        type: types_1.USER_LOADING
    };
};
exports.logoutUser = () => (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken_1.default(false);
    dispatch(exports.setCurrentUser(types_2.emptyUser));
    history_1.default.push("/");
};
//# sourceMappingURL=authActions.js.map