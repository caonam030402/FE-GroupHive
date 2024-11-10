import type { PayloadAction } from "@reduxjs/toolkit";

import type { initStateType } from "./type";

const setIsCollapsedSideBarAction = (
  state: initStateType,
  action: PayloadAction<boolean>,
) => {
  return {
    ...state,
    isCollapsedSideBar: action.payload,
  };
};

export default setIsCollapsedSideBarAction;
