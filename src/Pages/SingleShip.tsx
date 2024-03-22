import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Loader } from "../Components";

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

export default function SingleShip() {
  const id = useParams();
  const singleShipAPI = `https://api.spacexdata.com/v4/ships/${id["id"]}`;
  const { data, isLoading, error } = useFetch<ShipsObject>(singleShipAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white flex flex-col-reverse p-5 md:grid grid-cols-2">
          <article>
            <h1 className="heading text-4xl capitalize">{data?.name}</h1>
            {data?.year_built ? (
              <h2 className="font-bold opacity-75 text-3xl my-5 capitalize">
                Built in: {data?.year_built}
              </h2>
            ) : (
              ""
            )}

            <ul className="opacity-75 text-sm flex flex-col items-start justify-start gap-3">
              {data?.mass_kg ? (
                <li>Mass: {data?.mass_kg.toLocaleString()} kg</li>
              ) : (
                <li>Mass in Kg not provided</li>
              )}
              {data?.mass_lbs ? (
                <li>Mass: {data?.mass_lbs.toLocaleString()} lbs</li>
              ) : (
                <li>Mass in lbs not provided</li>
              )}
              <li>Launches: {data?.launches.length}</li>
              <li>Type: {data?.type}</li>
              {data?.active ? (
                <li className="text-emerald-500 capitalize">Active</li>
              ) : (
                <li className="text-rose-500 capitalize">Inactive</li>
              )}
            </ul>
            <p className="font-bold opacity-75 text-2xl mb-10 mt-2 capitalize">
              Home port: {data?.home_port}
            </p>
            <ul className="flex flex-col md:flex-row lg:flex-row items-center justify-start gap-2 mt-10">
              <li className="opacity-75 text-sm hover:opacity-100 btn">
                <a href={data?.link} target="_blank" rel="noopener noreferrer">
                  Read More &rarr;
                </a>
              </li>
              <li className="opacity-75 text-sm hover:opacity-100 btn">
                <Link to="/ships">&larr; Back</Link>
              </li>
            </ul>
          </article>
          <article>
            {data?.image ? (
              <img
                src={data?.image}
                alt={data?.name}
                loading="lazy"
                className="h-full w-full object-cover center"
              />
            ) : (
              <img
                className="h-full w-full object-cover center"
                src="https://i.imgur.com/ngYgFnn.jpg"
                alt={data?.name}
              />
            )}
          </article>
        </section>
      )}
    </>
  );
}
