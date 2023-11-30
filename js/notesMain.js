//importing notesApp
import notesApp from "./notesApp.js";

//getting element with id app and using applying notesApp class on it
const root =  document.getElementById("app");
const app = new notesApp(root);
