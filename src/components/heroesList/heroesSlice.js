import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook"; // доступ к функционалу запросов

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

// actionCreator with async function
// можно использовать async/await, но мы уже указали его в useHttp
export const fetchHeroes = createAsyncThunk("heroes/fecthHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes");
});

// request("http://localhost:3001/filters")
// .then(data => dispatch(filtersFetched(data)))
// .catch(() => dispatch(filtersFetchingError()))

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // иммутабельно by immer JS from toolkit

    /* //заменено на createAsyncThunk
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    */
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // формирование / отправление
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      // success
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

// получаем все действия и reducer
const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroCreated,
  heroDeleted,
} = actions;
