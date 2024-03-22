import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { Loader } from "../Components";

interface LaunchPadObject {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
}

export default function Launchpads() {
  const capsulesAPI = "https://api.spacexdata.com/v4/launchpads";
  const { data, isLoading, error } = useFetch<LaunchPadObject[]>(capsulesAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white">
          <h1 className="heading text-center mb-10">LaunchPads</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(({ id, name, images, details }) => (
                <Link key={id} to={`/launchpads/${id}`}>
                  <article className="relative">
                    <img
                      src={images?.large[0]}
                      alt={name}
                      loading="lazy"
                      className="h-64 w-full object-cover center"
                    />
                    <div className="bg-zinc-900 p-5">
                      <h2 className="text-lg mb-3 font-bold">{name}</h2>
                      <p className="opacity-75 mb-8">{`${details.substring(
                        0,
                        100
                      )}...`}</p>
                      <Link className="btn mt-5" to={`/launchpads/${id}`}>
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
