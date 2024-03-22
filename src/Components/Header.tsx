import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
export default function Header() {
  const handleOpenMenu = () => {
    const navbar = document.querySelector(".navbar");
    const listItems = document.querySelectorAll("li");

    navbar && navbar.classList.toggle("open");
    listItems.forEach((listItem) => {
      listItem.addEventListener("click", () => {
        navbar && navbar.classList.remove("open");
      });
    });
  };

  const links = [
    { path: "/capsules", name: "Capsules" },
    { path: "/cores", name: "Cores" },
    { path: "/crew", name: "Crew" },
    { path: "/dragons", name: "Dragons" },
    { path: "/landpads", name: "Landpads" },
    { path: "/launches", name: "Launches" },
    { path: "/launchpads", name: "Launchpads" },
    { path: "/payloads", name: "Payloads" },
    { path: "/roadster", name: "Roadster" },
    { path: "/rockets", name: "Rockets" },
    { path: "/ships", name: "Ships" },
    { path: "/starlink", name: "Starlink" },
  ];
  return (
    <>
      <header className="absolute top-0 left-0 p-5 flex items-center justify-between w-full lg:py-0">
        <div>
          <Link to="/">
            <img src={logo} alt="SpaceX" className="w-16 lg:w-auto" />
          </Link>
        </div>

        <nav className="navbar">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={handleOpenMenu}
            className="menu-button text-white uppercase text-sm tracking-wide"
          >
            Menu
          </button>
        </div>
      </header>
    </>
  );
}
