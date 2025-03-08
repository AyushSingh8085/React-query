import axios from "axios";
import { useQuery } from "react-query";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after countering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchRQSuperHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 30000,
      // refetchOnMount: false,
      // refreshOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
      // enabled: false,
      onSuccess,
      onError,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isFetching) {
    return <h2>Fetching data...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      <button onClick={refetch}>Fetch Data</button>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <p>{hero.name}</p>
        </div>
      ))}
    </>
  );
};
