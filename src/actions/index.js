// хранилище actionCreators / не используется с ToolKit

// import  {heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice.js"
//import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filtersSlice';


// // complex action creator / based on ReduxThunkMiddleware
// export const fetchHeroes = (request) => (dispatch) => {
//   dispatch(heroesFetching());
//   request("http://localhost:3001/heroes")
//       .then((data) => dispatch(heroesFetched(data))) 
//       .catch(() => dispatch(heroesFetchingError()));
// }

// export const fetchFilters = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//       .then(data => dispatch(filtersFetched(data)))
//       .catch(() => dispatch(filtersFetchingError()))
// }

// complex action creator / based on ReduxThunkMiddleware
// export const activeFilterChanged = (filter) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       //action
//       type: "ACTIVE_FILTER_CHANGED",
//       payload: filter,
//     });
//   }, 1000);
// };


// // классический actionCreators
// export const heroesFetching = () => {
//   return {
//     type: "HEROES_FETCHING",
//   };
// };

// export const heroesFetched = (heroes) => {
//   return {
//     type: "HEROES_FETCHED",
//     payload: heroes,
//   };
// };

// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };

// export const heroCreated = (hero) => {
//   return {
//     type: "HERO_CREATED",
//     payload: hero,
//   };
// };

// export const heroDeleted = (id) => {
//   return {
//     type: "HERO_DELETED",
//     payload: id,
//   };
// };

// export const filtersFetching = () => {
//   return {
//     type: "FILTERS_FETCHING",
//   };
// };

// export const filtersFetched = (filters) => {
//   return {
//     type: "FILTERS_FETCHED",
//     payload: filters,
//   };
// };

// export const filtersFetchingError = () => {
//   return {
//     type: "FILTERS_FETCHING_ERROR",
//   };
// };

// export const activeFilterChanged = (filter) => {
//   return {
//       type: 'ACTIVE_FILTER_CHANGED',
//       payload: filter
//   }
// }