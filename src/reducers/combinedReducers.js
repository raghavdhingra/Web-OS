import { combineReducers } from "redux";

import desktopReducers from "./desktopReducers";
import activityReducers from "./activityReducers";
import fileSystemReducers from "./fileSystemReducers";

export default combineReducers({
  activityReducers,
  desktopReducers,
  fileSystemReducers,
});
