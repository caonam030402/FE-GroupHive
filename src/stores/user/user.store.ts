/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
  auth: {
    token: "",
    refreshToken: "",
    tokenExpires: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthStore>) => {
      return {
        ...state,
        auth: action.payload,
      };
    },
  },
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
