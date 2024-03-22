import { Loader } from "../Components";
import useFetch from "../hooks/useFetch";

// Define the interface based on the provided JSON structure
interface CompanyObject {
  headquarters: {
    address: string;
    city: string;
    state: string;
  };
  links: {
    website: string;
    flickr: string;
    twitter: string;
    elon_twitter: string;
  };
  name: string;
  founder: string;
  founded: number;
  employees: number;
  vehicles: number;
  launch_sites: number;
  test_sites: number;
  ceo: string;
  cto: string;
  coo: string;
  cto_propulsion: string;
  valuation: number;
  summary: string;
  id: string;
}

export default function Homepage() {
  const companyAPI = "https://api.spacexdata.com/v4/company";
  const { data, isLoading, error } = useFetch<CompanyObject>(companyAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section className="showcase">
        <div className="overlay px-5">
          <h1 className="heading">
            All SpaceX info in one place{" "}
            <span className="block mt-2 opacity-50">
              aside from their website
            </span>
          </h1>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="flex flex-col justify-center md:flex-row">
                <article className="mt-5 mb-5 sm:mt-0 md:mr-10 lg:mr-20">
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    About
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Founded in {data?.founded} by {data?.founder}
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Has {data?.employees} employees,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {data?.vehicles} space vehicles,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {data?.vehicles} launch sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      and {data?.test_sites} test sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Valued at ${data?.valuation.toLocaleString()}.
                    </li>
                  </ul>
                </article>

                <article className="mb-5 md:mr-10 lg:mr-20">
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    Headquarters
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {data?.headquarters.address},
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {data?.headquarters.city}, {data?.headquarters.state}
                    </li>
                  </ul>
                </article>

                <article>
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    Social Media
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={data?.links.website}>Website</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={data?.links.flickr}>Flickr</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={data?.links.twitter}>Twitter</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={data?.links.elon_twitter}>Elon Musk Twitter</a>
                    </li>
                  </ul>
                </article>
              </div>

              <div className="text-center">
                <p className="text-white mt-10 sm:max-w-7xl md:max-w-5xl lg:max-w-2xl">
                  {data?.summary}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
