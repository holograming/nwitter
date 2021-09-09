import React, { useState } from "react";
import AppRouter from "./Router";

// Conntect to route first route
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // useState default = fase
  return (
  <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()} Nwitter customized by Hologramer </footer>
  </>
  ); // pass to prop
}

export default App;
