import axios from "axios";
import { useQuery } from "react-query";

//  // one way
// const fetchRQSuperHero = (heroId) => {    4

// second way
const fetchRQSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  // // one way
  // return useQuery(["super-hero", heroId], () => fetchRQSuperHero(heroId));

  // second way
  return useQuery(["super-hero", heroId], fetchRQSuperHero);
};
