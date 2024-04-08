import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import uiSlice from "./uiSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    expense: expenseSlice,
    ui: uiSlice,
    category: categorySlice,
  },
});

export default store;
