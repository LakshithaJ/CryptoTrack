import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Loader } from "../Components";

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

interface SingleLaunch {
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

export default function SingleLaunch() {
  const id = useParams();
  const singleLaunchAPI = `https://api.spacexdata.com/v4/launches/${id["id"]}`;
  const { data, isLoading, error } = useFetch<SingleLaunch>(singleLaunchAPI);

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    // Get the day of the month
    const day = date.getDate();

    // Get the month name
    const month = date.toLocaleString("default", { month: "long" });

    // Get the year
    const year = date.getFullYear();

    // Function to add the ordinal suffix to the day
    function getOrdinal(n: number) {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    // Combine them together
    return `${getOrdinal(day)} ${month} ${year}`;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white flex flex-col p-5 md:grid grid-cols-2">
          <article>
            <img
              src={data?.links?.patch?.large}
              alt={data?.name}
              className="h-100"
            />
          </article>
          <article>
            <h1 className="heading mt-10">{data?.name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 mt-2">
              Launch Date: {formatDate(data?.date_utc)},{" "}
              {data?.success ? (
                <span className="text-emerald-500">Successful</span>
              ) : (
                <span className="text-rose-500">Failed</span>
              )}
            </h2>

            <p className="mt-2 opacity-75 pr-5">{data?.details}</p>

            <ul className="text-sm">
              <h3 className="font-bold opacity-75 text-lg mb-2">Location</h3>
              <li className="mb-2 opacity-75 capitalize">
                Fairings: {data?.fairings?.reused ? "re-used" : "not re-used"}
              </li>
              <li className="mb-2 opacity-75 capitalize">
                Recovered:{" "}
                {data?.fairings?.recovered
                  ? "fairings recovered"
                  : "fairings not recovered"}
              </li>
            </ul>

            <ul className="text-sm flex flex-wrap items-center justify-start gap-5">
              <li className="btn mb-2 opacity-75 capitalize">
                <a
                  href={data?.links?.article}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read article
                </a>
              </li>
              {data?.links?.presskit && (
                <li className="btn mb-2 opacity-75 capitalize">
                  <a
                    href={data?.links?.presskit}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PressKit
                  </a>
                </li>
              )}

              <li className="btn mb-2 opacity-75 capitalize">
                <a
                  href={data?.links?.webcast}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch launch on YouTube
                </a>
              </li>
            </ul>
            <ul className="flex items-center justify-start gap-5 mt-10">
              <li>
                <a
                  className="btn opacity-75"
                  href={data?.links?.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </li>
              <li className="opacity-75 text-sm hover:opacity-100">
                <Link to="/launches" className="btn">
                  &larr; Back to Launches
                </Link>
              </li>
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
