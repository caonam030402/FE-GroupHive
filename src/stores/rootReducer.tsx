import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user/user.store";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
