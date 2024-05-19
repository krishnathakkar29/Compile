import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface appSlice {
  currentUser: {
    username?: string;
    email?: string;
    picture?: string;
    savedCodes?: string[];
  };
  isLoggedIn: boolean;
}

const initialState:appSlice = {
  currentUser: {},
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<appSlice["currentUser"]>
    ) => {
      state.currentUser = action.payload;
    },
    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { updateCurrentUser, updateIsLoggedIn } = appSlice.actions;
