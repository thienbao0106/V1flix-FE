import { createSlice } from "@reduxjs/toolkit";
import { account } from "../../utils/Storage";

console.log(account);
const initialState = {
  id: account.get("idUser") || 0,
  username: account.get("username") || "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      const { id, username } = action.payload;
      account.set("idUser", id);
      account.set("username", username);
      state = action.payload;
      return state;
    },
    handleLogout: (state) => {
      console.log("test");
      account.remove();
      state = { id: 0, username: "" };
      return state;
    },
  },
});

export const { setUserLogin, handleLogout } = accountSlice.actions;
export default accountSlice.reducer;
