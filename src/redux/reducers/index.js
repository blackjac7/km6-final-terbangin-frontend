import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flight from "./flight";
import notification from "./notification";

//combining some reducers
export default combineReducers({ auth, notification, flight });
