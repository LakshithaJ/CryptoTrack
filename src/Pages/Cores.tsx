import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface Cores {
  block: null | number;
  reuse_count: number;
  rtls_attempts: number;
  rtls_landings: number;
  asds_attempts: number;
  asds_landings: number;
  last_update: string;
  launches: string[];
  serial: string;
  status: string;
  id: string;
}

export default function Cores() {
  const coresAPI = "https://api.spacexdata.com/v4/cores";
  const { data, isLoading, error } = useFetch<Cores[]>(coresAPI);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 text-white">
          <h1 className="heading text-center mb-10">Cores</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(
                ({
                  id,
                  status,
                  serial,
                  launches,
                  last_update,
                  asds_landings,
                  block,
                  reuse_count,
                  rtls_landings,
                }) => (
                  <article key={id} className="articles">
                    <h2 className="text-xl font-bold mb-5">{serial}</h2>
                    <ul>
                      <li className="mb-1">Launches: {launches.length}</li>
                      <li className="mb-1">ASDS landings: {asds_landings} </li>
                      <li className="mb-1"> RTLS landings: {rtls_landings}</li>
                      <li className="mb-1">Reused {reuse_count} times</li>
                      {status === "active" ? (
                        <li className="text-emerald-500">Acitve</li>
                      ) : (
                        <li className="text-rose-500 capitalize">{status}</li>
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
