import { useEffect, useState } from "react";
import "./FavRecipesPage.css";
import type IRecipe from "../@types/recipes";
import { useUserContext } from "../context/userContext";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router";

export default function FavRecipesPage() {
  const { token, isLogged } = useUserContext();
  const [favoritesRecipes, setFavoritesRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritesRecipes = async () => {
      if (!token || !isLogged) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritesRecipes(response.data.favorites || response.data);
      } catch (error) {
        console.log("Erreur lors du fetch des favoris");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoritesRecipes();
  }, [token, isLogged]);

  if (isLoading) {
    return (
      <div className="articles">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div className="empty-state">
        <h3>Connectez-vous</h3>
        <p>Vous devez être connecté pour voir vos recettes favorites</p>
      </div>
    );
  }

  return (
    <div className="articles">
      <h1 className="title">Mes recettes favorites</h1>

      <div className="article-container">
        {favoritesRecipes.length === 0 ? (
          <div className="empty-state">
            <h3>Aucune recette favorite</h3>
            <p>Ajoutez des recettes à vos favoris en cliquant sur le cœur</p>
          </div>
        ) : (
          favoritesRecipes.map((recipe) => (
            <article key={recipe.id}>
              <img
                className="article-img"
                src={recipe.thumbnail}
                alt={recipe.title}
              />
              <h3 className="article-title">{recipe.title}</h3>
              <p className="article-level">Difficulté : {recipe.difficulty}</p>

              <button
                className="article-show-btn"
                onClick={() => navigate(`/recipes/${recipe.slug}`)}
              >
                Voir la recette
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
