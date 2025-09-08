import "./Recipes.css";
import type IRecipe from "../../@types/recipes";
import { useNavigate } from "react-router";
import redHeart from "../../assets/redHeart.svg";
import blackHeart from "../../assets/blackHeart.svg";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axiosInstance from "../../axios/axiosInstance";

interface IRecipes {
  recipes: IRecipe[];
  isLoading: boolean;
}

export default function Recipes({ recipes, isLoading }: IRecipes) {
  const navigate = useNavigate();

  const { isLogged, token } = useUserContext();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // récupérer les favoris de l'user
  useEffect(() => {
    if (isLogged && token) {
      const fecthFavoritesRecipes = async () => {
        try {
          const response = await axiosInstance.get("/favorites", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const favoriteIds = response.data.favorites.map(
            (fav: IRecipe) => fav.idMeal
          );
          setFavorites(new Set(favoriteIds));
        } catch (error) {
          console.log("Erreur lors du fetch");
        }
      };
      fecthFavoritesRecipes();
    }
  }, [isLogged, token]);

  // gestion des favoris
  const toggleFavorite = async (recipe: IRecipe) => {
    if (!isLogged || !token) return;

    try {
      if (favorites.has(recipe.idMeal)) {
        // retirer des favoris
        await axiosInstance.delete(`/favorites/${recipe.idMeal}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(recipe.idMeal);
          return newFavorites;
        });
      } else {
        // ajouter aux favoris
        await axiosInstance.post(
          `/favorites/${recipe.idMeal}`,
          { recipeId: recipe.idMeal },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites((prev) => new Set(prev).add(recipe.idMeal));
      }
    } catch (error) {
      console.log("Erreur lors de la modification des favoris", error);
    }
  };

  return (
    <div className="articles">
      <h1 className="title">Les recettes oRecipes</h1>
      <h2 className="subtitle">Voici nos {recipes.length} recettes</h2>

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

            {isLogged && (
              <img
                className="save-button"
                src={favorites.has(recipe.idMeal) ? redHeart : blackHeart}
                alt={
                  favorites.has(recipe.idMeal)
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
                }
                onClick={() => toggleFavorite(recipe)}
                style={{ cursor: "pointer", width: "24px", height: "24px" }}
              />
            )}

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
