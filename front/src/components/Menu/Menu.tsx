import "./Menu.css";

import { NavLink } from "react-router";
import { useUserContext } from "../../context/userContext";

import save from "../../assets/save.svg";

const zones = [
  "British",
  "French",
  "Italian",
  "Indian",
  "Japanese",
  "Mexican",
  "Moroccan",
];

export default function Menu() {
  const { isLogged } = useUserContext();

  return (
    <div className="menu">
      <ul className="menu-list">
        <li className="menu-list-item">
          <NavLink to="/">Accueil</NavLink>
        </li>

        {isLogged && (
          <li className="menu-list-item">
            <NavLink to="/favorites">
              <img className="save-icon" src={save} alt="save icon" />
              Favoris
            </NavLink>
          </li>
        )}

        {zones.map((zone) => (
          <li key={zone} className="menu-list-item">
            <NavLink to={`/area/${zone}`}>{zone}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
