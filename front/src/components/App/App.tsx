import "./reset.css";
import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import axios from "axios";

import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Recipes from "../Recipes/Recipes";
import ErrorPage from "../../pages/ErrorPage";
import RecipePage from "../../pages/RecipePage";
import FavRecipesPage from "../../pages/FavRecipesPage";
import RecipeByZonePage from "../../pages/RecipeByZonePage";
import type IRecipe from "../../@types/recipes";
import { useUserContext } from "../../context/userContext";

function App() {
  const [recipes, setRecipesList] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 6 recettes randoms
  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const requests = Array.from({ length: 6 }, () =>
          axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
        );
        const responses = await Promise.all(requests);
        const recipesFromAPI = responses.map((res) => res.data.meals[0]);
        setRecipesList(recipesFromAPI);
      } catch (error) {
        console.log("Erreur, impossible de charger les recettes");
      }
      setIsLoading(false);
    };
    fetchRandomRecipes();
  }, []);

  // récuper isLogged dans le context
  const { isLogged } = useUserContext();

  return (
    <div className="app-container">
      <Menu />
      <div className="recipes">
        <div className="recipes-container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Recipes recipes={recipes} isLoading={isLoading} />}
            />
            <Route path="/area/:zone" element={<RecipeByZonePage />} />
            {isLogged && (
              <Route path="/favorites" element={<FavRecipesPage />} />
            )}
            <Route
              path="/recipes/:slug"
              element={<RecipePage isLoading={isLoading} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
