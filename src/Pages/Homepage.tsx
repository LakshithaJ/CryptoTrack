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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="showcase">
          <div className="overlay">
            <article className="text-white">
              <h1 className="heading text-center">SpaceX</h1>
              <div className="mt-10 px-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto lg:gap-20">
                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    About
                  </h2>
                  <ul className="text-lg opacity-75">
                    <li className="mb-1">Name: {data?.name}</li>
                    <li className="mb-1">Founder: {data?.founder}</li>
                    <li className="mb-1">Founded in: {data?.founded}</li>
                    <li className="mb-1">
                      No. of employees: {data?.employees}
                    </li>
                    <li className="mb-1">No. of vehicles: {data?.vehicles}</li>
                    <li className="mb-1">
                      No. of launch sites: {data?.launch_sites}
                    </li>
                    <li className="mb-1">
                      No. of text sites: {data?.test_sites}
                    </li>
                    <li className="mb-1">CEO: {data?.ceo}</li>
                    <li className="mb-1">CTO: {data?.cto}</li>
                    <li className="mb-1">COO: {data?.coo}</li>
                    <li className="mb-1">
                      Valuation: {data?.valuation.toLocaleString()} B
                    </li>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Headquarters
                  </h2>
                  <ul className="text-lg opacity-75">
                    <li className="mb-1">{data?.headquarters.address}</li>
                    <li className="mb-1">{data?.headquarters.city}</li>
                    <li className="mb-1">{data?.headquarters.state}</li>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Important Links
                  </h2>
                  <ul className="text-lg opacity-75">
                    <li className="mb-1">
                      <a href={data?.links.website}>Website</a>
                    </li>
                    <li className="mb-1">
                      <a href={data?.links.elon_twitter}>Elons Twitter</a>
                    </li>
                    <li className="mb-1">
                      <a href={data?.links.flickr}>Flickr</a>
                    </li>
                    <li className="mb-1">
                      <a href={data?.links.twitter}>Twitter</a>
                    </li>
                  </ul>
                </article>
              </div>
              <p className="max-w-3xl mx-auto text-center mt-10">
                {data?.summary}
              </p>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
