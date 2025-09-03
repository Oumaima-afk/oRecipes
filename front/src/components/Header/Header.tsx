import "./Header.css";
import logo from "../../assets/logo.png";
import { useUserContext } from "../../context/userContext";
import axiosInstance from "../../axios/axiosInstance";

export default function Header() {
  const { pseudo, isLogged, login, logout } = useUserContext();

  // on check les données
  const checkCredentials = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      console.log(response);

      login(response.data.pseudo, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <img className="logo" src={logo} alt="logo O'recipes" />
      {!isLogged ? (
        <form
          className="loginform"
          action={(formData) => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            checkCredentials(email, password);
          }}
        >
          <input
            name="email"
            type="text"
            placeholder="Adresse Email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <button type="submit">OK</button>
        </form>
      ) : (
        // pour se déconnecter
        <div className="user-info">
          <div className="welcome-message">Bonjour {pseudo}</div>
          <button className="logout-btn" onClick={logout}>
            Se déconnecter
          </button>
        </div>
      )}
    </header>
  );
}
