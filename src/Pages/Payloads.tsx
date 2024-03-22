import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

interface PayloadsObject {
  dragon: {
    capsule: null | string;
    mass_returned_kg: null | number;
    mass_returned_lbs: null | number;
    flight_time_sec: null | number;
    manifest: null | string;
    water_landing: null | boolean;
    land_landing: null | boolean;
  };
  name: string;
  type: string;
  reused: boolean;
  launch: string;
  customers: string[];
  norad_ids: number[];
  nationalities: string[];
  manufacturers: string[];
  mass_kg: number | null;
  mass_lbs: number | null;
  orbit: string;
  reference_system: string;
  regime: string;
  longitude: null | number;
  semi_major_axis_km: null | number;
  eccentricity: null | number;
  periapsis_km: null | number;
  apoapsis_km: null | number;
  inclination_deg: number | null;
  period_min: null | number;
  lifespan_years: null | number;
  epoch: null | string;
  mean_motion: null | number;
  raan: null | number;
  arg_of_pericenter: null | number;
  mean_anomaly: null | number;
  id: string;
}

export default function Payloads() {
  const coresAPI = "https://api.spacexdata.com/v4/payloads";
  const { data, isLoading, error } = useFetch<PayloadsObject[]>(coresAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-32 text-white">
          <h1 className="heading text-center mb-10">Payloads</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data &&
              data.map(
                ({
                  id,
                  name,
                  type,
                  orbit,
                  manufacturers,
                  customers,
                  reference_system,
                  nationalities,
                }) => (
                  <article key={id} className="articles">
                    <h2 className="text-xl font-bold mb-5">
                      {name}, <span className="opacity-75">{type}</span>
                    </h2>
                    <ul>
                      <li className="mb-1 opacity-75">Orbit: {orbit}</li>
                      <li className="mb-1 opacity-75">
                        Reference System: {reference_system}
                      </li>
                    </ul>
                    {customers.length > 0 && (
                      <ul className="mb-3">
                        <h3 className="font-bold mb-1">Customers:</h3>
                        {customers.map((name, index) => (
                          <li key={index} className="opacity-75">
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {manufacturers.length > 0 && (
                      <ul className="mb-3">
                        <h3 className="font-bold mb-1">Manufacturers:</h3>
                        {manufacturers.map((name, index) => (
                          <li key={index} className="opacity-75">
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {nationalities.length > 0 && (
                      <ul>
                        <h3 className="font-bold mb-1">Countries:</h3>
                        {nationalities.map((name, index) => (
                          <li key={index} className="opacity-75">
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              )}
          </div>
        </section>
      )}
    </>
  );
}
