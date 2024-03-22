import useFetch from "../hooks/useFetch";
import { Loader } from "../Components";

interface SpaceTrack {
  CCSDS_OMM_VERS: string;
  COMMENT: string;
  CREATION_DATE: string;
  ORIGINATOR: string;
  OBJECT_NAME: string;
  OBJECT_ID: string;
  CENTER_NAME: string;
  REF_FRAME: string;
  TIME_SYSTEM: string;
  MEAN_ELEMENT_THEORY: string;
  EPOCH: string;
  MEAN_MOTION: number;
  ECCENTRICITY: number;
  INCLINATION: number;
  RA_OF_ASC_NODE: number;
  ARG_OF_PERICENTER: number;
  MEAN_ANOMALY: number;
  EPHEMERIS_TYPE: number;
  CLASSIFICATION_TYPE: string;
  NORAD_CAT_ID: number;
  ELEMENT_SET_NO: number;
  REV_AT_EPOCH: number;
  BSTAR: number;
  MEAN_MOTION_DOT: number;
  MEAN_MOTION_DDOT: number;
  SEMIMAJOR_AXIS: number;
  PERIOD: number;
  APOAPSIS: number;
  PERIAPSIS: number;
  OBJECT_TYPE: string;
  RCS_SIZE: string;
  COUNTRY_CODE: string;
  LAUNCH_DATE: string;
  SITE: string;
  DECAY_DATE: string;
  DECAYED: number;
  FILE: number;
  GP_ID: number;
  TLE_LINE0: string;
  TLE_LINE1: string;
  TLE_LINE2: string;
}

interface StarlinkObject {
  spaceTrack: SpaceTrack;
  launch: string;
  version: string;
  height_km: null | number;
  latitude: null | number;
  longitude: null | number;
  velocity_kms: null | number;
  id: string;
}
export default function Starlink() {
  const shipsAPI = "https://api.spacexdata.com/v4/starlink";
  const { data, isLoading, error } = useFetch<StarlinkObject[]>(shipsAPI);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 pt-32">
            <h1 className="heading text-center">Starlink</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {data?.map(({ id, version, spaceTrack }) => (
                <article key={id} className="articles p-5">
                  <h2 className="text-white text-xl font-bold mb-2">
                    {spaceTrack.OBJECT_NAME},{" "}
                    <span className="text-base opacity-75">{version}</span>
                  </h2>
                  <p className="text-sm lg:text-base text-white opacity-75">
                    <span className="font-bold">Launch Date: </span>
                    {spaceTrack.LAUNCH_DATE}
                  </p>
                  <p className="text-sm lg:text-base text-white opacity-75">
                    <span className="font-bold">Launch Site: </span>
                    {spaceTrack.SITE}
                  </p>
                  <p className="text-sm lg:text-base text-white opacity-75 mt-2">
                    G
                    <span className="lowercase">{`${spaceTrack.COMMENT.substring(
                      1,
                      33
                    )}`}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
