import "./RecipePage.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type IRecipe from "../@types/recipes";

export default function RecipePage({ isLoading }: { isLoading: boolean }) {
  const params = useParams();
  const slug = params.slug;
  console.log(slug);

  const [recipe, setRecipe] = useState<null | IRecipe>(null);

  useEffect(() => {
    console.log("recipepage");
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://orecipesapi.onrender.com/api/recipes/${slug}`
        );
        const recipeFromAPI = response.data;
        setRecipe(recipeFromAPI);
        console.log(recipeFromAPI);
      } catch (erreur) {
        console.log("Erreur, la recette n'a pas pu être récupéré...");
      }
    };

    fetchRecipe();
  }, [params]);

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
          src={recipe.thumbnail}
          alt={recipe.thumbnail}
        />
        <h3 className="recipe-page-title">{recipe.title}</h3>
        <p className="recipe-infos">
          {recipe.author} - {recipe.difficulty}
        </p>
        <div className="ingredients">
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="ingredients-list-item">
                <p className="ingredient-quantity">
                  {ingredient.quantity} {ingredient.unit}
                </p>
                <p className="ingredient-name">{ingredient.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul>
          {recipe.instructions.map((instruction) => (
            <li key={instruction} className="instructions">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
