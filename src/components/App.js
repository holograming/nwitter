import React, { useEffect, useState } from "react";
//https://create-react-app.dev/docs/importing-a-component#absolute-imports
import AppRouter from "components/Router";
import { authService } from "fBase";

// Conntect to route first route
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false); 
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setLoggedIn(user?true:false);
      setInit(true);
    }
    );
  }, []);
  return (
  <>
    {init? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing......"}
    <footer>&copy; {new Date().getFullYear()} Nwitter customized by Hologramer </footer>
  </>
  ); // pass to prop
}

export default App;
