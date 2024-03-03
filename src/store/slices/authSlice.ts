import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "src/models/general/User";
import { DecodeToken } from "src/utils/Helpers";
import LocalStorage from "src/utils/LocalStorage";

interface AuthState {
  token: string | null;
  user: UserModel | null;
}

const initialState: AuthState = {
  token: LocalStorage.getFromLocalStorage("accessToken") || null,
  user: LocalStorage.getFromLocalStorage("accessToken")
    ? DecodeToken(LocalStorage.getFromLocalStorage("accessToken"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload: token }) => ({ ...state, token: token }),
    setUser: (_, action: PayloadAction<{ accessToken: string }>) => {
      LocalStorage.setInLocalStorage("accessToken", action.payload.accessToken);
      const user: UserModel = DecodeToken(action.payload.accessToken);
      return { token: action.payload.accessToken, user };
    },
    setLogout: (state) => {
      LocalStorage.removeFromLocalStorage("accessToken");
      state.token = null;
      state.user = null;
    },
  },
});

export const { setLogout, setUser, setToken } = authSlice.actions;

export default authSlice;
