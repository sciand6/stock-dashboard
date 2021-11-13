import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lowdate: "",
  highdate: "",
  currenttickers: [],
  pagesarr: [],
  activeindex: 0,
  pageamount: 10,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    saveInput: (state, action) => {
      state.lowdate = action.payload.lowdate;
      state.highdate = action.payload.highdate;
      state.currenttickers = action.payload.currenttickers;
    },
    updatePages: (state, action) => {
      state.pagesarr = action.payload.pagesarr;
    },
    updateActiveIndex: (state, action) => {
      state.activeindex = action.payload.activeindex;
    },
    updatePageAmount: (state, action) => {
      state.pageamount = action.payload.pageamount;
    },
  },
});

export const { saveInput, updatePages, updateActiveIndex, updatePageAmount } =
  inputSlice.actions;

export default inputSlice.reducer;
