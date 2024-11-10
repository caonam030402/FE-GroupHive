import { createSelector } from "reselect";

import type { AppState } from "..";

const selectSetting = (state: AppState) => state.setting;

export const selectIsCollapsed = createSelector(
  [selectSetting],
  (setting) => setting.isCollapsedSideBar,
);
