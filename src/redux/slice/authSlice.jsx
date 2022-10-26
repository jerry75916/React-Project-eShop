import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID } = action.payload;

      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.IsLoggedIn = true; //利用一開始的useeffect 趨動dispatch 將loggin 值設定true/false 讓使用者在任何組件都可以取到
      //登入狀態
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.IsLoggedIn = false;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedin = (state) => state.auth.IsLoggedIn;
export const selectemail = (state) => state.auth.email;
export const selectuserName = (state) => state.auth.userName;
export const selectuserID = (state) => state.auth.userID;
export default authSlice.reducer;
