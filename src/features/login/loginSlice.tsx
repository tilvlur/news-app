import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type UserId = string;

interface RegisteredUserData {
  userId: UserId;
  userRole: "user" | "admin";
  userName: string;
  userPassword: string;
}

export interface LoginState {
  currentUserRole: "guest" | "user" | "admin";
  passStatus: "idle" | "error" | "pass";
  currentUserData: RegisteredUserData | null;
  registeredUsers: Array<RegisteredUserData>;
}

interface LoginPayload {
  login: string;
  password: string;
}

const initialState: LoginState = {
  currentUserRole: "guest",
  passStatus: "idle",
  currentUserData: null,
  registeredUsers: [
    {
      userId: "1",
      userRole: "admin",
      userName: "admin",
      userPassword: "adminPass",
    },
    {
      userId: "2",
      userRole: "user",
      userName: "user",
      userPassword: "userPass",
    },
  ],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<LoginPayload>) {
      const { login, password } = action.payload;

      const findRegisterUser = state.registeredUsers.find(
        (el) => el.userName === login && el.userPassword === password,
      );

      if (findRegisterUser) {
        state.currentUserRole = findRegisterUser.userRole;
        state.currentUserData = findRegisterUser;
        state.passStatus = "pass";
      } else state.passStatus = "error";
    },
    setLogout(state) {
      state.currentUserRole = "guest";
      state.passStatus = "idle";
      state.currentUserData = null;
    },
    resetPassError(state) {
      state.passStatus = "idle";
    },
  },
});

export default loginSlice.reducer;

export const { setLogin, setLogout, resetPassError } = loginSlice.actions;

export const selectLoginData = (state: RootState) => state.login;
