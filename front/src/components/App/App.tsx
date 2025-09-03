import "./reset.css";
import "./App.css";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Recipes from "../Recipes/Recipes";
import ErrorPage from "../../pages/ErrorPage";
import RecipePage from "../../pages/RecipePage";
import { useState, useEffect } from "react";
import type IRecipe from "../../@types/recipes";
import axios from "axios";
import { Routes, Route } from "react-router";

function App() {
  const [recipes, setRecipesList] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://orecipesapi.onrender.com/api/recipes"
        );
        const recipesFromAPI = response.data;
        setRecipesList(recipesFromAPI);
      } catch (erreur) {
        console.log("Erreur, les recettes n'ont pas pu être récupérés...");
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="app-container">
      <Menu recipes={recipes} />
      <div className="recipes">
        <div className="recipes-container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Recipes recipes={recipes} isLoading={isLoading} />}
            />
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
