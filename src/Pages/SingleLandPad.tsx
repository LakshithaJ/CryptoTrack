import { Link, useParams } from "react-router-dom";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface SingleLandPad {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  status: string;
  type: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  landing_attempts: number;
  landing_successes: number;
  wikipedia: string;
  details: string;
  launches: string[];
  id: string;
}

export default function SingleLandPad() {
  const id = useParams();
  const singleLandPadAPI = `https://api.spacexdata.com/v4/landpads/${id["id"]}`;
  const { data, isLoading, error } = useFetch<SingleLandPad>(singleLandPadAPI);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white flex flex-col-reverse p-5 md:grid grid-cols-2">
          <article>
            <h1 className="heading mt-10">{data?.full_name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 mt-2">
              {data?.name}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
              <ul className="text-sm">
                <li className="mb-2 opacity-75">
                  {data?.launches.length} Launches
                </li>
                <li className="mb-2 opacity-75">
                  {data?.landing_successes} Successful Landings
                </li>
                {data?.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    Current Status: {data?.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    Current Status: {data?.status}
                  </li>
                )}
              </ul>

              <ul className="text-sm">
                <h3 className="font-bold opacity-75 text-lg mb-2">Location</h3>
                <li className="mb-2 opacity-75">Locality: {data?.locality}</li>
                <li className="mb-2 opacity-75">Region: {data?.region}</li>
              </ul>
            </div>

            <p className="mt-2 opacity-75 pr-5">{data?.details}</p>
            <ul className="flex items-center justify-start gap-5 mt-10">
              <li>
                <a
                  className="btn opacity-75"
                  href={data?.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </li>
              <li className="opacity-75 text-sm hover:opacity-100">
                <Link to="/landpads" className="btn">
                  &larr; Back to Landpads
                </Link>
              </li>
            </ul>
          </article>
          <article>
            <img
              src={data?.images?.large[0]}
              alt={data?.full_name}
              className="h-100"
            />
          </article>
        </section>
      )}
    </>
  );
}
