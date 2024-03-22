import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Loader } from "../Components";
import { useState } from "react";

interface RocketsObject {
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  first_stage: {
    thrust_sea_level: {
      kN: number;
      lbf: number;
    };
    thrust_vacuum: {
      kN: number;
      lbf: number;
    };
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  };
  second_stage: {
    thrust: {
      kN: number;
      lbf: number;
    };
    payloads: {
      composite_fairing: {
        height: {
          meters: number;
          feet: number;
        };
        diameter: {
          meters: number;
          feet: number;
        };
      };
      option_1: string;
    };
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  };
  engines: {
    isp: {
      sea_level: number;
      vacuum: number;
    };
    thrust_sea_level: {
      kN: number;
      lbf: number;
    };
    thrust_vacuum: {
      kN: number;
      lbf: number;
    };
    number: number;
    type: string;
    version: string;
    layout: string;
    engine_loss_max: number;
    propellant_1: string;
    propellant_2: string;
    thrust_to_weight: number;
  };
  landing_legs: {
    number: number;
    material: string | null;
  };
  payload_weights: Array<{
    id: string;
    name: string;
    kg: number;
    lb: number;
  }>;
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}
export default function SingleRocket() {
  const id = useParams();
  const [toggle, setToggle] = useState(false);
  const [imageOnDisplay, setImageOnDisplay] = useState(0);
  const singleRocketAPI = `https://api.spacexdata.com/v4/rockets/${id["id"]}`;
  const { data, isLoading, error } = useFetch<RocketsObject>(singleRocketAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white flex flex-col-reverse p-5 md:grid grid-cols-2">
          <article>
            <h1 className="heading text-4xl capitalize">{data?.name}</h1>
            <h2 className="font-bold opacity-75 text-2xl mt-2 capitalize">
              Type: {data?.type}
            </h2>
            <h2 className="font-bold opacity-75 text-2xl mb-10 mt-2 capitalize">
              First Flight: {data?.first_flight}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
              <ul className="text-sm">
                <li className="mb-2 opacity-75">
                  <span className="font-bold">Cost per Launch: </span>
                  {data?.cost_per_launch.toLocaleString()} USD
                </li>
                <li className="mb-2 opacity-75">
                  <span className="font-bold">Company: </span> {data?.company}
                </li>
                <li className="mb-2 opacity-75">
                  <span className="font-bold">Success Rate: </span>{" "}
                  {data?.success_rate_pct}%
                </li>
                {data?.active ? (
                  <li className="text-emerald-500 capitalize">Active</li>
                ) : (
                  <li className="text-rose-500 capitalize">Inactive</li>
                )}
              </ul>

              <ul className="text-sm">
                <li className="mb-2 opacity-75">
                  <span className="font-bold">Country:</span> {data?.country}
                </li>
                <li className="mb-2 opacity-75">
                  <span className="font-bold">Stages:</span> {data?.stages}
                </li>
                {toggle ? (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Height:</span>{" "}
                    {data?.height?.feet} ft
                  </li>
                ) : (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Height:</span>{" "}
                    {data?.height?.meters.toLocaleString()} m
                  </li>
                )}

                {toggle ? (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Diameter:</span>{" "}
                    {data?.diameter?.feet.toLocaleString()} ft
                  </li>
                ) : (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Diameter:</span>{" "}
                    {data?.diameter?.meters.toLocaleString()} m
                  </li>
                )}

                {toggle ? (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Mass: </span>
                    {data?.mass?.lb.toLocaleString()} lb
                  </li>
                ) : (
                  <li className="mb-2 opacity-75">
                    <span className="font-bold">Mass: </span>
                    {data?.mass?.kg.toLocaleString()} Kg
                  </li>
                )}
              </ul>
            </div>

            <p className="mt-2 opacity-75 pr-5">{data?.description}</p>
            <ul className="flex flex-col md:flex-row lg:flex-row items-center justify-start gap-2 mt-10">
              <li className="opacity-75 text-sm hover:opacity-100 btn">
                <a
                  href={data?.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </li>
              <li className="btn">
                <button onClick={() => setToggle(!toggle)}>
                  {toggle ? "Show Metric Units" : "Show Imperial Units"}
                </button>
              </li>
              <li className="opacity-75 text-sm hover:opacity-100 btn">
                <Link to="/rockets">&larr; Back</Link>
              </li>
            </ul>
          </article>
          <article className="mb-5">
            <img
              src={data?.flickr_images[imageOnDisplay]}
              alt={data?.name}
              className="h-96 w-full object-cover"
            />

            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {data?.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setImageOnDisplay(index)}
                  className={`${index === imageOnDisplay && "p-1 bg-white"}`}
                >
                  <img
                    src={image}
                    alt={data?.name}
                    className="w-28 h-20 object-cover cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
