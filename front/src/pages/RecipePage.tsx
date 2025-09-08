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
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);

  useEffect(() => {
    if (!recipeId) return;
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const recipeFromAPI = response.data.meals[0];
        setRecipe(recipeFromAPI);

        Object.keys(recipeFromAPI).forEach((key) => {
          if (key.includes("strIngredient") && recipeFromAPI[key] !== "") {
            setIngredients((prev) => {
              if (prev.length === 0) return [recipeFromAPI[key]];
              else return [...prev, recipeFromAPI[key]];
            });
          }

          if (key.includes("strMeasure") && recipeFromAPI[key] !== "") {
            setMeasures((prev) => {
              if (prev.length === 0) return [recipeFromAPI[key]];
              else return [...prev, recipeFromAPI[key]];
            });
          }
        });
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
          {ingredients.map((ingredient, index) => (
            <div key={ingredient} className="ingredient">
              <span className="measures">{measures[index]}</span>{" "}
              <span className="ingredient-list">{ingredient}</span>
            </div>
          ))}
        </div>
        <div className="instructions">{recipe.strInstructions}</div>
      </div>
    </div>
  );
}
