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
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      else {
        setUserObj(null);
      }
      setInit(true);
    }
    );
  }, []);

  const refreshUser = () => {
    /// 아래의 주석처럼 해도 상태는 변경되었으나, re-render 실행되지 않는다.
    /// 이유인즉, userObj가 굉장히 큰 덩어리의 obj 이므로, 상태가 변경되어 re-render 대상인지
    /// 판단 여부가 모호하기 때문. 그래서 작은단위로 변경이 필요함.
    // setUserObj(authService.currentUser)
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
  <>
    {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : "Initializing......"}
    <footer>&copy; {new Date().getFullYear()} Nwitter customized by Hologramer </footer>
  </>
  ); // pass to prop
}

export default App;
