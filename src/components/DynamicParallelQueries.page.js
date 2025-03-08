import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const fetchFriends = (frndId) => {
  return axios.get(`http://localhost:4000/friends/${frndId}`);
};

export const DynamicParallelQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds?.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );

  const superHeroesQuery = queryResults[0];

  return <div>DynamicParallelQueriesPage</div>;
};
