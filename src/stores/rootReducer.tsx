import { combineReducers } from "@reduxjs/toolkit";

import settingReducer from "./setting/slice";
import userReducer from "./user/user.store";

const rootReducer = combineReducers({
  user: userReducer,
  setting: settingReducer,
});

export default rootReducer;
