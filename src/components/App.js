import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authService } from "../myBase";
import AppRouter from "./AppRouter";

const Loading = styled.div`
  display: block;
  text-align: center;
`;

function App() {
  // console.log(authService.currentUser); -> null

  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // Login
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
        setUserObj(user);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  });
  return (
    <>
      {init ? (
        <AppRouter isLogIn={isLogIn} userObj={userObj} />
      ) : (
        <Loading>Loading...</Loading>
      )}
    </>
  );
}

export default App;
