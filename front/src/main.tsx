import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./components/App/App.tsx";
import UserContextProvider from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
