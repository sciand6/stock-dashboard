import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockdata: [],
  loading: false,
  error: "",
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setStocks: (state, action) => {
      state.stockdata = action.payload.stockdata;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setStocks, setLoading, setError } = stockSlice.actions;

export default stockSlice.reducer;
