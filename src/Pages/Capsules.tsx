import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface CapsuleObject {
  reuse_count: number;
  water_landings: number;
  land_landings: number;
  last_update: string;
  launches: string[];
  serial: string;
  status: string;
  type: string;
  id: string;
}

export default function Capsules() {
  const capsulesAPI = "https://api.spacexdata.com/v4/capsules";
  const { data, isLoading, error } = useFetch<CapsuleObject[]>(capsulesAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32">
          <h1 className="text-black heading text-center mb-10">Capsules</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(
                ({
                  id,
                  type,
                  status,
                  serial,
                  launches,
                  last_update,
                  land_landings,
                  water_landings,
                  reuse_count,
                }) => (
                  <article key={id} className="articles">
                    <h2 className="text-xl font-bold mb-5">
                      {type},{" "}
                      <span className="text-base opacity-75 font-light">
                        {serial}
                      </span>
                    </h2>
                    <ul>
                      <li className="mb-1">Launches: {launches.length}</li>
                      <li className="mb-1">Land landings: {land_landings}</li>
                      <li className="mb-1">Water landings: {water_landings}</li>
                      <li className="mb-1">Reused {reuse_count} times</li>
                      {status === "active" ? (
                        <li className="text-emerald-500">Acitve</li>
                      ) : (
                        <li className="text-rose-500">Retired</li>
                      )}
                    </ul>
                    <p className="mt-5 opacity-75">{last_update}</p>
                  </article>
                )
              )}
          </div>
        </section>
      )}
    </>
  );
}
