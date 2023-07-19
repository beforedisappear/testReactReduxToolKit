import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice.js" // reducer from heroesSlice
import filters from "../components/heroesFilters/filtersSlice.js" // reducer from filtersSlice

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
  reducer: { heroes, filters },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",

});

export default store;


 

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);
//     //сохраняем оригинальный dispatch
//     const oldDispatch = store.dispatch;
//     //переопределяем dispatch нашего store
//     store.dispatch = (action) => {
//       //если приходит строка
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     applyMiddleware(thunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );