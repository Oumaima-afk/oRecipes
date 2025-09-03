import "./Recipes.css";
import type IRecipe from "../../@types/recipes";

interface IRecipes {
  recipes: IRecipe[];
  isLoading: boolean;
}

export default function Recipes({ recipes, isLoading }: IRecipes) {
  return (
    <div className="articles">
      <h1 className="title">Les recettes oRecipes</h1>
      <h2 className="subtitle">Voici nos {recipes.length} recettes</h2>

      <div className="article-container">
        {isLoading && <div className="loader"></div>}
        {recipes.map((recipe) => (
          <article key={recipe.id}>
            <img
              className="article-img"
              src={recipe.thumbnail}
              alt={recipe.title}
            />
            <h3 className="article-title">{recipe.title}</h3>
            <p className="article-level">Difficulté : {recipe.difficulty}</p>
            <button className="article-show-btn">Voir la recette</button>
          </article>
        ))}
      </div>
    </div>
  );
}
