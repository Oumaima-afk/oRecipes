import "./Menu.css";

import type IRecipe from "../../@types/recipes";
import { NavLink } from "react-router";

interface IRecipes {
  recipes: IRecipe[];
}

export default function Menu({ recipes }: IRecipes) {
  return (
    <div className="menu">
      <ul className="menu-list">
        <li className="menu-list-item">
          <NavLink to="/">Accueil</NavLink>
        </li>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="menu-list-item">
            <NavLink to={`/recipes/${recipe.slug}`}>{recipe.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
