import { Loader } from "../Components";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

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
export default function Rockets() {
  const rocketsAPI = "https://api.spacexdata.com/v4/rockets";
  const { data, isLoading, error } = useFetch<RocketsObject[]>(rocketsAPI);
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
              data.map(({ name, id, flickr_images, description }) => (
                <Link key={id} to={`/rockets/${id}`}>
                  <article className="relative">
                    <img
                      src={flickr_images[0]}
                      alt={name}
                      loading="lazy"
                      className="h-64 w-full object-cover center"
                    />
                    <div className="bg-zinc-900 p-5">
                      <h2 className="font-bold text-white text-lg tracking-wide mb-5">
                        {name}
                      </h2>
                      <p className="text-white opacity-75 mb-8">{`${description.substring(
                        0,
                        200
                      )}...`}</p>
                      <Link to={`/rockets/${id}`} className="btn">
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
