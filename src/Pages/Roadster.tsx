import { useState } from "react";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

interface RoadsterObject {
  name: string;
  launch_date_utc: string;
  launch_date_unix: number;
  launch_mass_kg: number;
  launch_mass_lbs: number;
  norad_id: number;
  epoch_jd: number;
  orbit_type: string;
  apoapsis_au: number;
  periapsis_au: number;
  semi_major_axis_au: number;
  eccentricity: number;
  inclination: number;
  longitude: number;
  periapsis_arg: number;
  period_days: number;
  speed_kph: number;
  speed_mph: number;
  earth_distance_km: number;
  earth_distance_mi: number;
  mars_distance_km: number;
  mars_distance_mi: number;
  flickr_images: string[];
  wikipedia: string;
  video: string;
  details: string;
  id: string;
}

export default function Roadster() {
  const [imageOnDisplay, setImageOnDisplay] = useState(0);
  const roadsterAPI = "https://api.spacexdata.com/v4/roadster";
  const { data, isLoading, error } = useFetch<RoadsterObject>(roadsterAPI);
  if (error) return <div>Error: {error.message}</div>;

  function formatDateFromUnix(unixTimestamp: number): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(unixTimestamp * 1000); // JavaScript Date expects milliseconds

    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    return `${day < 10 ? "0" + day : day} ${months[monthIndex]} ${year}`;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white">
          <div className="bg-zinc-900 p-5 rounded">
            <h1 className="heading text-center mb-10">{data?.name}</h1>
            <article className="mb-5">
              <div className="flex flex-col">
                <img
                  src={data?.flickr_images[imageOnDisplay]}
                  alt={data?.name}
                  className="h-96 w-full object-cover"
                />
                <ul className="flex flex-wrap items-center justify-start gap-3 my-5">
                  {data?.flickr_images.map((image, index) => (
                    <li
                      key={index}
                      onClick={() => setImageOnDisplay(index)}
                      className={`${
                        index === imageOnDisplay && "p-1 bg-white"
                      }`}
                    >
                      <img
                        src={image}
                        alt={data?.name}
                        className="w-28 h-20 object-cover cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <div>
              <article>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </article>
            </div>
            <p>{data?.details}</p>
            <div className="grid md:grid-cols-2 gap-5 mt-12">
              <ul>
                <li>
                  <span className="font-bold">Launch Date:</span>
                  {data?.launch_date_unix
                    ? formatDateFromUnix(data?.launch_date_unix)
                    : "N/A"}
                </li>
                <li>
                  <span className="font-bold">Launch Mass:</span>{" "}
                  {data?.launch_mass_kg} Kg
                </li>
                <li>
                  <span className="font-bold">Days Since Launch:</span>{" "}
                  {Math.round(data?.period_days ?? 0)}
                </li>
                <li>
                  <span className="font-bold">Speed:</span>{" "}
                  {Math.round(data?.speed_kph ?? 0)} Km/h
                </li>
              </ul>

              <ul>
                <li>
                  <span className="font-bold">Distance from the Earth: </span>
                  {data?.earth_distance_km != null
                    ? `${Math.round(
                        data?.earth_distance_km
                      ).toLocaleString()} Kms`
                    : "N/A"}
                </li>
                <li className="py-5">
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
                <li className="mb-1">
                  {" "}
                  <a
                    className="btn"
                    href={data?.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube Video
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
