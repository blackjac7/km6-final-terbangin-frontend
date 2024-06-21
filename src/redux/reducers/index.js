import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import notification from "./notification";

export default combineReducers({ auth, notification, });
