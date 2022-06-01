import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import styled from "styled-components";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Profile from "../routers/Profile";
import Navigation from "./Navigation";

function AppRouter({ isLogIn, userObj }) {
  return (
    <Router>
      {isLogIn && <Navigation />}
      <Routes>
        {isLogIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />

            <Route exact path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
