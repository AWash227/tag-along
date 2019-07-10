import Axios, { AxiosResponse, AxiosError } from "axios";
import setAuthToken from "../utils/setAuthToken";
import * as jwt_decode from "jwt-decode";
import history from "../history";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { IUser, emptyUser } from "../types";
import { History } from "history";
import { Dispatch } from "redux";

//Register the User
export const registerUser = (userData: IUser, history: History) => (
  dispatch: Dispatch
) => {
  console.log("registering user");
  Axios.post("/api/users/register", userData)
    .then(res => {
      console.log(res);
      history.push("/login");
    }) //re-direct to login after register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = (userData: IUser) => (dispatch: Dispatch) => {
  Axios.post("/api/users/login", userData)
    .then((res: AxiosResponse) => {
      // Save to localStorage
      //
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded: IUser = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Set logged in user
export const setCurrentUser = (decoded: IUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log the user out
export const logoutUser = () => (dispatch: Dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser(emptyUser));
  history.push("/");
};
