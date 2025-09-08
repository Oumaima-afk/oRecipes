import "../components/Recipes/Recipes.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type IRecipe from "../@types/recipes";

export default function RecipeByZonePage() {
  const { zone } = useParams();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!zone) return;

    console.log("recipepage");
    const fetchRecipeByZone = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${zone}`
        );
        const recipezByZone = response.data.meals;
        setRecipes(recipezByZone);
        console.log(recipezByZone);
      } catch (erreur) {
        console.log("Erreur, les recettes n'ont pas pu être récupérées...");
      }
      setIsLoading(false);
    };

    fetchRecipeByZone();
  }, [zone]);

  if (!recipes) {
    return (
      <div className="recipe-container">
        <h2>Recette non trouvée</h2>
        <p>La recette que vous cherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="articles">
      <h1 className="title">Recettes de la zone : {zone}</h1>
      <h2 className="subtitle">Voici {recipes.length} recettes</h2>

      <div className="article-container">
        {isLoading && <div className="loader"></div>}
        {recipes.map((recipe) => (
          <article key={recipe.idMeal}>
            <img
              className="article-img"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <h3 className="article-title">{recipe.strMeal}</h3>
            <button
              className="article-show-btn"
              onClick={() => navigate(`/recipes/${recipe.idMeal}`)}
            >
              Voir la recette
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
