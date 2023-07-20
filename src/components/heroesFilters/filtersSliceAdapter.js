import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  activeFilter: "all", // наш активный фильтр
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { filtersChanged } = actions;
