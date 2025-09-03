import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";
import RecipePage from "./pages/RecipePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipes/:slug" element={<RecipePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
