import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSliceAdapter.js"; // reducer from filtersSlice
import { apiSlise } from "../api/apiSlice.js";

//middleware
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

//store
const store = configureStore({
  reducer: { filters, [apiSlise.reducerPath]: apiSlise.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlise.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;