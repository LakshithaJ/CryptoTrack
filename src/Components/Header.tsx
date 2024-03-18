import React from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";
export default function Header() {
  return (
    <>
      <header className="header absolute flex items-center justify-between px-5 w-full">
        <div>
          <Link to="/">
            <SiSpacex className="text-8xl text-white" />
          </Link>
        </div>

        <ul className="flex flex-wrap">
          <li className="mr-2">
            <Link to="./capsules" className="text-white text-sm lg:text-base">
              Capsules
            </Link>
          </li>
          <li className="mr-2">
            <Link to="./cores" className="text-white text-sm lg:text-base">
              Cores
            </Link>
          </li>
          <li className="mr-2">
            <Link to="./crew" className="text-white text-sm lg:text-base">
              Crew
            </Link>
          </li>
          <li className="mr-2">
            <Link className="text-white text-sm lg:text-base" to="./dragons">
              Dragons
            </Link>
          </li>
          <li className="mr-2">
            <Link className="text-white text-sm lg:text-base" to="./landpads">
              Landpads
            </Link>
          </li>
          <li className="mr-2">
            <Link className="text-white text-sm lg:text-base" to="./launches">
              Launches
            </Link>
          </li>
          {/* <li>
            <Link className="text-white text-sm lg:text-base" to="./launchpads">
              Launchpads
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-sm lg:text-base"
              to="./payloads"
            ></Link>
          </li>
          <li>
            <Link className="text-white text-sm lg:text-base" to="./roadster">
              Roadster
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm lg:text-base" to="./rockets">
              Rockets
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm lg:text-base" to="./ships">
              Ships
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm lg:text-base" to="./starlink">
              Starlink
            </Link>
          </li> */}
        </ul>
      </header>
    </>
  );
}
