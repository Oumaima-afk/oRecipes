import axios from "axios";

// on créé une instance avec la base url , ce qui nous permettra de ne pas la re saisir à chaque fois
export default axios.create({
  baseURL: "https://orecipesapi.onrender.com/api/",
});
