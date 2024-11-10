import { createSlice } from "@reduxjs/toolkit";

import setIsCollapsedSideBarAction from "./actions";
import initialState from "./initialState";

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setIsCollapsedSideBar: setIsCollapsedSideBarAction,
  },
});

export const { setIsCollapsedSideBar } = settingSlice.actions;

export default settingSlice.reducer;
