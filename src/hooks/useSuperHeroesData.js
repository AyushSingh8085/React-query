import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchRQSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroes = data?.data.map((hero) => hero.name);
    //   return superHeroes;
    // },
  });
};

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero);
};
