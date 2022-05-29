import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

function AppRouter({ isLogIn }) {
  return (
    <Router>
      <Switch>
        {isLogIn ? (
          <>
            <Route exact path="/">
              {/* 홈 화면 */}
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            {/* 로그인 화면 */}
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
