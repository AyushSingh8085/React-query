import axios from "axios";
import { useQuery } from "react-query";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery("super-heroes", fetchRQSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <p>{hero.name}</p>
        </div>
      ))}
    </>
  );
};
