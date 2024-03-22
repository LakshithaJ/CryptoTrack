import { Link } from "react-router-dom";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface ShipsObject {
  last_ais_update: null | string;
  legacy_id: string;
  model: null | string;
  type: string;
  roles: string[];
  imo: number;
  mmsi: number;
  abs: number;
  class: number;
  mass_kg: number;
  mass_lbs: number;
  year_built: number;
  home_port: string;
  status: string;
  speed_kn: null | number;
  course_deg: null | number;
  latitude: null | number;
  longitude: null | number;
  link: string;
  image: string;
  name: string;
  active: boolean;
  launches: string[];
  id: string;
}

export default function Ships() {
  const shipsAPI = "https://api.spacexdata.com/v4/ships";
  const { data, isLoading, error } = useFetch<ShipsObject[]>(shipsAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 text-white">
          <h1 className="heading text-center mb-10">Rockets</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(({ name, id, image, home_port }) => (
                <Link key={id} to={`/ships/${id}`}>
                  <article className="bg-zinc-900">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-96 w-full object-cover center"
                      />
                    ) : (
                      <img
                        className="h-96 w-full object-cover center"
                        src="https://i.imgur.com/ngYgFnn.jpg"
                        alt={name}
                      />
                    )}
                    <div className="p-5">
                      <h2 className="font-bold text-white text-lg tracking-wide mb-5">
                        {name}
                      </h2>
                      <p className="opacity-75 mb-10">{home_port}</p>
                      <Link to={`/ships/${id}`} className="btn">
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
