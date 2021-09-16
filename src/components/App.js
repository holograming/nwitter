import React, { useEffect, useState } from "react";
//https://create-react-app.dev/docs/importing-a-component#absolute-imports
import AppRouter from "components/Router";
import { authService } from "fBase";

// Conntect to route first route
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // When app initialize or when user login, when user logout.
    authService.onAuthStateChanged((user) => {
      setUserObj(user?user:null);
      setInit(true);
    }
    );
  }, []);
  return (
  <>
    {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing......"}
    <footer>&copy; {new Date().getFullYear()} Nwitter customized by Hologramer </footer>
  </>
  ); // pass to prop
}

export default App;
