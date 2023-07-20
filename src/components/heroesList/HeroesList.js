import { CSSTransition, TransitionGroup } from "react-transition-group";
// запрос на серевер
import { useHttp } from "../../hooks/http.hook";
// контролирование запроса
import { useCallback, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";

//import { heroDeleted, fetchHeroes } from "./heroesSlice";
import { heroDeleted, fetchHeroes, selectAll } from "./heroesSliceAdapter";


// hero
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "../heroesList/heroesList.scss";

import { filteredHeroesSelector } from "./heroesSliceAdapter";
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  
  const filteredHeroes = useSelector(filteredHeroesSelector);

  // previous variant with re-rendering
  // const filteredHeroes = useSelector((state) => {
  //   if (state.filters.activeFilter === "all") {
  //     console.log('render')
  //     return state.heroes.heroes;
  //   }
  //   else {
  //     console.log('render')
  //     return state.heroes.heroes.filter(
  //       (item) => item.element === state.filters.activeFilter
  //     );
  //   }
  // });

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  // // запрос при первичной загрузке
  // useEffect(() => {
  //   // запускаем загрузку = HEROES_FETCHING
  //   //dispatch(heroesFetching());
  //   dispatch(heroesFetching); // redux-thunk
  //   request("http://localhost:3001/heroes")
  //     .then((data) => dispatch(heroesFetched(data))) // загрузка завершена = HEROES_FETCHED
  //     .catch(() => dispatch(heroesFetchingError())); // ошибка при загрузке = HEROES_FETCHING_ERROR

  //   // eslint-disable-next-line
  // }, []);

  //using complex action creator
  useEffect(() => {
    //dispatch(fetchHeroes(request));
    dispatch(fetchHeroes()); // request есть уже внутри среза
  }, []);

  const onDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then((data) => console.log(data, "Deleted"))
      .then(dispatch(heroDeleted(id)))
      .catch((err) => console.log(err));
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="hero">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
