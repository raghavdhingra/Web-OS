import { combineReducers } from "redux";
import activityReducers from "./activityReducers";
import desktopReducers from "./desktopReducers";
import fileSystemReducers from "./fileSystemReducers";

export default combineReducers({
  activityReducers,
  desktopReducers,
  fileSystemReducers,
});
