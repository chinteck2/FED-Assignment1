//importing flashcardsApp
import flashcardsApp from "./flashcardsApp.js";

//getting element with id app and using applying flashcardsApp class on it
const root =  document.getElementById("app");
const app = new flashcardsApp(root);