import axios from "axios";
import { JwtFromRequestFunction } from "passport-jwt";
import { JwtHeader } from "jsonwebtoken";

const setAuthToken = (token: JwtHeader) => {
  if (token) {
    //Apply Authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
