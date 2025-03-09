import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");   // Query Invalidation

    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const prevHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });

      return {
        prevHeroData, // rollback the data in case of failure
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.prevHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
