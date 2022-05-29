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

  // Login
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  });
  return (
    <>
      {init ? <AppRouter isLogIn={isLogIn} /> : <Loading>Loading...</Loading>}
    </>
  );
}

export default App;
