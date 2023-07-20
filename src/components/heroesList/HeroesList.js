import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "../heroesList/heroesList.scss";

const HeroesList = () => {
  //функция для вызова мутации
  const {
    data: heroes = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHeroesQuery();
  //функция для вызова мутации
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector(state => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice(); // копия ориг массива во избежании мутациии
    if (activeFilter === "all") {
      console.log("render");
      return filteredHeroes;
    } else {
      console.log("render");
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]); 

  const onDelete = (id) => {
    deleteHero(id);
  };

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
