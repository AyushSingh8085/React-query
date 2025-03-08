import axios from "axios";
import { useQueries, useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  // First way

  //   const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  //   const { data: friends } = useQuery("friends", fetchFriends);

  //   Second way
  const results = useQueries([
    {
      queryKey: ["super-heroes"],
      queryFn: fetchSuperHeroes,
    },
    {
      queryKey: ["friends"],
      queryFn: fetchFriends,
    },
  ]);

  const superHeroesQuery = results[0];
  const friendsQuery = results[1];

  return <div>ParallelQueriesPage</div>;
};
