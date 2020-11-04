import React, { useState, useCallback } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "./components/context/auth-context";
import Authenticate from "./pages/authenticate";
import TaskBoard from "./pages/tasksBoard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback((userId, password, userName = null) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        password: password,
        userName: userName,
      })
    );
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <Router>
          <Switch>
            {!isLoggedIn && (
              <Route exact path="/">
                <Authenticate />
              </Route>
            )}
            {isLoggedIn && (
              <Route exact path="/">
                <TaskBoard />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
