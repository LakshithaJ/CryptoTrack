import { Link, useParams } from "react-router-dom";
import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface SingleCrewObject {
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
  serial: string;
  status: string;
  id: string;
}

export default function SingleCrew() {
  const id = useParams();
  const singleCrewAPI = `https://api.spacexdata.com/v4/crew/${id["id"]}`;
  const { data, isLoading, error } = useFetch<SingleCrewObject>(singleCrewAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32">
          <div className="max-width grid grid-cols-1 gap-8 md:grid-cols-2 md-gap-10 px-5">
            <article>
              <img src={data?.image} alt={data?.name} />
            </article>

            <article>
              <h1 className="heading mb-10">{data?.name}</h1>
              <h2 className="text-white font-bold mb-5 text-lg">Details</h2>
              <ul className="text-white opacity-75 text-sm">
                <li className="mb-2">Currently at: {data?.agency}</li>
                <li className="mb-2">Launches: {data?.launches?.length}</li>
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

              <ul className="flex items-center justify-start gap-5 mt-10">
                <li>
                  <a
                    className="btn text-white"
                    href={data?.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </a>
                </li>
                <li className="text-white opacity-75 text-sm hover:opacity-100">
                  <Link to="/crew" className="btn">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
