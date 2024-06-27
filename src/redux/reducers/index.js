import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flight from "./flight";
import history from "./history";

//combining some reducers
export default combineReducers({ auth, flight, history });
