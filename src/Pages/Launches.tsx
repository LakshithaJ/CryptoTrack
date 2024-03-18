import { Link } from "react-router-dom";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

interface Patch {
  small: string;
  large: string;
}

interface Reddit {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface Flickr {
  small: string[];
  original: string[];
}

interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: string | null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

interface Failure {
  time: number;
  altitude: number | null;
  reason: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

interface Launch {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: Failure[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

type LaunchesObject = Launch[];

export default function Launches() {
  const launchesAPI = "https://api.spacexdata.com/v4/launches";
  const { data, isLoading, error } = useFetch<LaunchesObject>(launchesAPI);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white">
          <h1 className="heading text-center mb-10">Launches</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(({ id, name, details, links }) => (
                <Link key={id} to={`/launches/${id}`}>
                  <div className="bg-zinc-900 p-5 rounded">
                    {links?.patch?.large ? (
                      <img
                        src={links?.patch?.large}
                        alt={name}
                        className="object-cover"
                      />
                    ) : (
                      <img
                        src="https://images2.imgbox.com/5b/02/QcxHUb5V_o.png"
                        alt={name}
                        className="object-cover"
                      />
                    )}
                    <h2 className="font-bold text-xl tracking-wide mb-2">
                      {name}
                    </h2>
                    {details && (
                      <p className="opacity-75 mb-8">{`${details?.substring(
                        0,
                        75
                      )}...`}</p>
                    )}
                    <Link className="btn mt-5" to={`/launches/${id}`}>
                      Read more &rarr;
                    </Link>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
