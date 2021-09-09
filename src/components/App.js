import React, { useState } from "react";
//https://create-react-app.dev/docs/importing-a-component#absolute-imports
import AppRouter from "components/Router";
import { authService } from "fBase";

// Conntect to route first route
function App() {
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser); 
  return (
  <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()} Nwitter customized by Hologramer </footer>
  </>
  ); // pass to prop
}

export default App;
