import "./Menu.css";

import type IRecipe from "../../@types/recipes";
import { NavLink } from "react-router";
import { useUserContext } from "../../context/userContext";

import save from "../../assets/save.svg";

interface IRecipes {
  recipes: IRecipe[];
}

export default function Menu({ recipes }: IRecipes) {
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

        {recipes.map((recipe) => (
          <li key={recipe.id} className="menu-list-item">
            <NavLink to={`/recipes/${recipe.slug}`}>{recipe.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
