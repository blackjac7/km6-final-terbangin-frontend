import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flight from "./flight";
<<<<<<< HEAD

//combining some reducers
export default combineReducers({ auth, flight });
=======
import notification from "./notification";

//combining some reducers
export default combineReducers({ auth, notification, flight });
>>>>>>> db97bc951a04d5acd4a851774580a614cd038524
