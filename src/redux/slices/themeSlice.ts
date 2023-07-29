import { createSlice } from "@reduxjs/toolkit";
import { profileSetting } from "../../utils/Storage";

const initialState = {
  mode: profileSetting.get("mode") || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      console.log("test");
      state.mode = state.mode === "dark" ? "light" : "dark";
      profileSetting.set("mode", state.mode);
      return state;
    },
  },
});
console.log(themeSlice.actions);
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
