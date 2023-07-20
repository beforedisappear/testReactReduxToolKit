import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook"; // доступ к функционалу запросов

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fecthHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      heroesAdapter.addOne(state, action.payload); //state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload); //state.heroes = state.heroes.filter((item) => item.id !== action.payload);
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
        heroesAdapter.setAll(state, action.payload); //state.heroes = action.payload;
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
//селекторы будут обращаться к героеям
const { selectAll } = heroesAdapter.getSelectors(
  (state) => state.heroes
);

// селектор для получения отфильтрованных героев (пример смеси двух стейтов, лучше хранить в слайсе чтоб не копипастить)
export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll, //(state) => state.heroes.heroes,
  (filter, heroes) => {
    if (filter === "all") {
      console.log("render");
      return heroes;
    } else {
      console.log("render");
      return heroes.filter((item) => item.element === filter);
    }
  }
);
export const { heroCreated, heroDeleted } = actions;
