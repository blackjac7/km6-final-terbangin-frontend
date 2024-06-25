import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flight from "./flight";
import notification from "./notification";
import payment from "./payment";

//combining some reducers
export default combineReducers({ auth, notification, flight, payment });
