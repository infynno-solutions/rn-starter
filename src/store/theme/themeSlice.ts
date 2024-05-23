import { createSlice } from "@reduxjs/toolkit";
import { DarkTheme, DefaultTheme } from "../../styles/themes";

const initialState = {
  theme: DefaultTheme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme:(state,{payload})=> {
      state.theme=payload==='Dark'?DarkTheme:DefaultTheme
     },
    resetTheme: (state, { payload }) => {

      return initialState
    },
  },
});

export const {
  changeTheme,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
