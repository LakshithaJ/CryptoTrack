import { Loader } from "../Components";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface Thruster {
  type: string;
  amount: number;
  pods: number;
  fuel_1: string;
  fuel_2: string;
  isp: number;
  thrust: {
    kN: number;
    lbf: number;
  };
}

interface PayloadVolume {
  cubic_meters: number;
  cubic_feet: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface Volume {
  cubic_meters: number;
  cubic_feet: number;
}

interface DragonsObject {
  heat_shield: {
    material: string;
    size_meters: number;
    temp_degrees: number;
    dev_partner: string;
  };
  launch_payload_mass: Mass;
  launch_payload_vol: Volume;
  return_payload_mass: Mass;
  return_payload_vol: Volume;
  pressurized_capsule: {
    payload_volume: PayloadVolume;
  };
  trunk: {
    trunk_volume: PayloadVolume;
    cargo: {
      solar_array: number;
      unpressurized_cargo: boolean;
    };
  };
  height_w_trunk: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  first_flight: string;
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  crew_capacity: number;
  sidewall_angle_deg: number;
  orbit_duration_yr: number;
  dry_mass_kg: number;
  dry_mass_lb: number;
  thrusters: Thruster[];
  wikipedia: string;
  description: string;
  id: string;
}

export default function Dragons() {
  const dragonsAPI = "https://api.spacexdata.com/v4/dragons";
  const { data, isLoading, error } = useFetch<DragonsObject[]>(dragonsAPI);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 text-white">
          <h1 className="heading text-center mb-10">Dragons</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 px-5">
            {data &&
              data.map(({ name, id, flickr_images, description }) => (
                <Link key={id} to={`/dragons/${id}`}>
                  <article className="relative">
                    <img
                      src={flickr_images[0]}
                      alt={name}
                      loading="lazy"
                      className="h-96 w-full object-cover center"
                    />
                    <div className="bg-black p-5">
                      <h2 className="font-bold text-white text-lg tracking-wide mb-5">
                        {name}
                      </h2>
                      <p className="text-white opacity-75 mb-8">{`${description.substring(
                        0,
                        200
                      )}...`}</p>
                      <Link to={`/dragons/${id}`} className="btn">
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
