import useFetch from "../hooks/useFetch";
import { Loader } from "../Components";
import { Link } from "react-router-dom";

interface LandPad {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  status: string;
  type: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  landing_attempts: number;
  landing_successes: number;
  wikipedia: string;
  details: string;
  launches: string[];
  id: string;
}

type LandPads = LandPad[];

export default function Landpads() {
  const landpadsAPI = "https://api.spacexdata.com/v4/landpads";
  const { data, isLoading, error } = useFetch<LandPads>(landpadsAPI);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white">
          <h1 className="heading text-center mb-10">Landpads</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(({ id, full_name, images, type, details }) => (
                <Link key={id} to={`/landpads/${id}`}>
                  <article className="relative">
                    <img
                      src={images?.large[0]}
                      alt={full_name}
                      loading="lazy"
                      className="h-64 w-full object-cover center"
                    />
                    <div className="bg-zinc-900 p-5">
                      <h2 className="font-bold text-xl tracking-wide mb-2">
                        <span className="opacity-75">{type}, </span>
                        {full_name}
                      </h2>
                      <p className="opacity-75 mb-8">{`${details.substring(
                        0,
                        200
                      )}...`}</p>
                      <Link className="btn mt-5" to={`./landpads/${id}`}>
                        Read more &rarr;
                      </Link>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
