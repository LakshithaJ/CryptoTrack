import { Link, useParams } from "react-router-dom";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface SingleLaunchPadObject {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
}

export default function SingleLaunchPad() {
  const id = useParams();
  const singleLandPadAPI = `https://api.spacexdata.com/v4/launchpads/${id["id"]}`;
  const { data, isLoading, error } =
    useFetch<SingleLaunchPadObject>(singleLandPadAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 max-width text-white flex flex-col-reverse p-5 md:grid grid-cols-2">
          <article>
            <h1 className="heading">{data?.full_name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 mt-2">
              {data?.name}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
              <ul className="text-sm">
                <li className="mb-2 opacity-75">
                  {data?.launch_attempts} Launch attempts
                </li>
                <li className="mb-2 opacity-75">
                  {data?.launch_successes} Successful Launches
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
            <ul className="flex items-center justify-start gap-2 mt-10">
              <li className="opacity-75 text-sm hover:opacity-100">
                <Link to="/launchpads" className="btn">
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>
          <article className="mt-5 md:mt-0">
            <img
              src={data?.images?.large[0]}
              alt={data?.full_name}
              className="h-96 object-cover"
            />
          </article>
        </section>
      )}
    </>
  );
}
