import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flight from "./flight";

//combining some reducers
export default combineReducers({ auth, flight });
