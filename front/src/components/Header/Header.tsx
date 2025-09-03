import "./Header.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="logo O'recipes" />
      <form action="">
        <input type="text" placeholder="Adresse Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">OK</button>
      </form>
    </header>
  );
}
