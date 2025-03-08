import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

//  // one way
// const fetchRQSuperHero = (heroId) => {    4

// second way
const fetchRQSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  // // one way
  // return useQuery(["super-hero", heroId], () => fetchRQSuperHero(heroId));

  // second way
  return useQuery(["super-hero", heroId], fetchRQSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero?.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
