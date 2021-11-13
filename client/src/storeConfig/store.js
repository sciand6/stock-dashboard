import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "../slices/inputSlice";
import stockReducer from "../slices/stockSlice";

export const store = configureStore({
  reducer: {
    input: inputReducer,
    stock: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
