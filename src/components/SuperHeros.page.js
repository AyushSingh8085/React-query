import axios from "axios";
import { useEffect, useState } from "react";

export const SuperHerosPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heros Page</h2>
      {data.map((hero) => (
        <div key={hero.id}>
          <p>{hero.name}</p>
        </div>
      ))}
    </>
  );
};
