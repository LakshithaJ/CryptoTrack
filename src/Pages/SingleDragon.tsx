import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../Components";
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

interface SingleDragon {
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

export default function SingleDragon() {
  const id = useParams();
  const [toggle, setToggle] = useState(false);
  const [imageOnDisplay, setImageOnDisplay] = useState(0);
  const singleDragonAPI = `https://api.spacexdata.com/v4/dragons/${id["id"]}`;
  const { data, isLoading, error } = useFetch<SingleDragon>(singleDragonAPI);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white px-5 flex flex-col md:grid md:grid-cols-2 md:gap-10">
          <article>
            <h1 className="heading mb-8">{data?.name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10">
              First flight date: {data?.first_flight}
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ul className="text-sm opacity-75 capitalize flex flex-col items-start justify-start gap-2">
                <li>Type: {data?.type}</li>
                <li>Crew: {data?.crew_capacity}</li>
                {toggle ? (
                  <li>Dry Mass: {data?.dry_mass_lb} lb</li>
                ) : (
                  <li>Dry Mass: {data?.dry_mass_kg} kg</li>
                )}
                {data?.active ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">Inactive</li>
                )}
                <li className="my-3">
                  {" "}
                  <a
                    className="btn"
                    href={data?.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </a>
                </li>
              </ul>

              <ul className="bg-zinc-900 text-sm opacity-75 p-3 rounded">
                <h3 className="font-bold opacity-100 uppercase text-lg mb-3">
                  Heat shield details
                </h3>
                <li className="mb-1">
                  Material: {data?.heat_shield?.material}
                </li>
                <li className="mb-1">Size: {data?.heat_shield?.size_meters}</li>
                <li className="mb-1">
                  Temperature: {data?.heat_shield?.temp_degrees}
                </li>
                <li>Dev partner: {data?.heat_shield?.dev_partner}</li>
              </ul>
            </div>
            <p className="opacity-75 mt-5 mb-8">{data?.description}</p>

            <div className="opacity-75 text-sm">
              {/* Metric units */}
              {toggle ? (
                <ul className="flex flex-col items-start justify-start gap-2">
                  <li>
                    Launch Payload Mass: {data?.launch_payload_mass?.lb} lb
                  </li>
                  <li>
                    Return Payload Mass: {data?.return_payload_mass?.lb} lb
                  </li>
                  <li>
                    Pressurized Capsule Payload Volume:{" "}
                    {data?.pressurized_capsule?.payload_volume?.cubic_feet} ft
                    <sup>3</sup>
                  </li>
                  <li>Height With Trunck: {data?.height_w_trunk?.feet} ft</li>
                  <li>
                    Launch Payload Volume:{" "}
                    {data?.launch_payload_vol?.cubic_feet} ft
                    <sup>3</sup>
                  </li>
                  <li>
                    Return Payload Volume:{" "}
                    {data?.return_payload_vol?.cubic_feet} ft
                    <sup>3</sup>
                  </li>
                  <li>
                    Trunck Volume: {data?.trunk?.trunk_volume?.cubic_feet} ft
                    <sup>3</sup>
                  </li>
                  <li>Diameter: {data?.diameter?.feet} ft</li>
                </ul>
              ) : (
                <ul className="flex flex-col items-start justify-start gap-2">
                  <li>
                    Launch Payload Mass: {data?.launch_payload_mass?.kg} kg
                  </li>
                  <li>
                    Return Payload Mass: {data?.return_payload_mass?.kg} kg
                  </li>
                  <li>
                    Pressurized Capsule Payload Volume:{" "}
                    {data?.pressurized_capsule?.payload_volume?.cubic_meters}m
                    <sup>3</sup>
                  </li>
                  <li>Height With Trunck: {data?.height_w_trunk?.meters} m</li>
                  <li>
                    Launch Payload Volume:{" "}
                    {data?.launch_payload_vol?.cubic_meters} m<sup>3</sup>
                  </li>
                  <li>
                    Return Payload Volume:{" "}
                    {data?.return_payload_vol?.cubic_meters} m<sup>3</sup>
                  </li>
                  <li>
                    Trunck Volume: {data?.trunk?.trunk_volume?.cubic_meters}m
                    <sup>3</sup>
                  </li>
                  <li>Diameter: {data?.diameter?.meters} m</li>
                </ul>
              )}

              {/* Imperial Units */}
              <ul className="flex flex-col items-start justify-start gap-2">
                <li>Launch Payload Mass: {data?.launch_payload_mass?.lb} lb</li>
                <li>Return Payload Mass: {data?.return_payload_mass?.lb} lb</li>
                <li>
                  Pressurized Capsule Payload Volume:{" "}
                  {data?.pressurized_capsule?.payload_volume?.cubic_feet} ft
                  <sup>3</sup>
                </li>
                <li>Height With Trunck: {data?.height_w_trunk?.feet} ft</li>
                <li>
                  Launch Payload Volume: {data?.launch_payload_vol?.cubic_feet}{" "}
                  ft<sup>3</sup>
                </li>
                <li>
                  Return Payload Volume: {data?.return_payload_vol?.cubic_feet}{" "}
                  ft<sup>3</sup>
                </li>
                <li>
                  Trunck Volume: {data?.trunk?.trunk_volume?.cubic_feet} ft
                  <sup>3</sup>
                </li>
                <li>Diameter: {data?.diameter?.feet} ft</li>
              </ul>
            </div>
            <ul className="mt-8 flex items-center gap-4 justify-start hover:opacity-100">
              <li>
                <button className="btn" onClick={() => setToggle(!toggle)}>
                  {toggle ? "Show Metric Units" : "Show Imperial Units"}
                </button>
              </li>
              <li className="opacity-75 text-sm hover:opacity-100">
                <Link to="/dragons" className="btn">
                  &larr; Back to Dragons
                </Link>
              </li>
            </ul>
          </article>

          <article className="mt-5">
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
