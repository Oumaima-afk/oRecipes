import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface IUserContext {
  isLogged: boolean;
  pseudo: string;
  token: string;
  login: (pseudo: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<null | IUserContext>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [token, setToken] = useState("");

  // login : enregistrer pseudo et token dans les states
  // isLogged passe à true
  const login = (pseudo: string, token: string) => {
    setPseudo(pseudo);
    setToken(token);
    setIsLogged(true);

    // on stock dans le local storage
    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("token", token);
  };

  // logout : vider pseudo et token
  // isLogged passe à false
  const logout = () => {
    setPseudo("");
    setToken("");
    setIsLogged(false);

    // on supprime du local storage
    localStorage.removeItem("pseudo");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // on check le local storage
    const token = localStorage.getItem("token");
    const pseudo = localStorage.getItem("pseudo");

    // si on trouve un token + pseudo on se connecte
    if (token && pseudo) {
      login(token, pseudo);
    }
  }, []);

  // les données qu'on va utiliser partout dans l'appli via UserContext
  // pourront être utilisées par n'importe quel composant enfant {children}
  return (
    <UserContext value={{ pseudo, token, isLogged, login, logout }}>
      {children}
    </UserContext>
  );
}

// custom hook : renvoie le context et throw une erreur si null
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Context vide, le provider est manquant.");
  }

  return context;
};
