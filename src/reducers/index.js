import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import language from "./language";
export default combineReducers({
  auth,
  message,
  language
});