import { Loader } from "../Components";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface Crew {
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
  status: string;
  id: string;
}

export default function Crew() {
  const crewAPI = "https://api.spacexdata.com/v4/crew";
  const { data, isLoading, error } = useFetch<Crew[]>(crewAPI);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 text-white">
          <h1 className="heading text-center mb-10">Crew</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(({ name, id, image }) => (
                <Link key={id} to={`/crew/${id}`}>
                  <article className="relative">
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-96 w-full object-contain center"
                    />
                    <h2 className="absolute bottom-5 left-5 font-bold text-white text-lg tracking-wide">
                      {name}
                    </h2>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
