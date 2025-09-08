import "./RecipePage.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type IRecipe from "../@types/recipes";

export default function RecipePage({ isLoading }: { isLoading: boolean }) {
  const params = useParams();
  const recipeId = params.slug;
  console.log("Recipe slug : ", recipeId);

  const [recipe, setRecipe] = useState<null | IRecipe>(null);

  useEffect(() => {
    if (!recipeId) return;

    console.log("recipepage");
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const recipeFromAPI = response.data.meals[0];
        setRecipe(recipeFromAPI);
        console.log(recipeFromAPI);
      } catch (erreur) {
        console.log("Erreur, la recette n'a pas pu être récupéré...");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return (
      <div className="recipe-container">
        <h2>Recette non trouvée</h2>
        <p>La recette que vous cherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && <div className="loader"></div>}
      <div className="recipe-container">
        <img
          className="recipe-page-img"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <h3 className="recipe-page-title">{recipe.strMeal}</h3>

        <div className="ingredients">
          <ul className="ingredients-list">{recipe.strInstructions}</ul>
        </div>
      </div>
    </div>
  );
}
