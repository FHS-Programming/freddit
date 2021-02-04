import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import "./App.css";
import Profile from "./pages/userprofile/Profile";
import Nav from "./pages/nav/Nav";
import Comments from "./pages/PostInfo_Comment/Comment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
function App() {
  const [isLogged] = useAuthState(auth);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Nav isLogged={isLogged} />
        <Route exact path="/" component={() => <Home isLogged={isLogged} />} />
        <Route
          path="/Comment/:id"
          render={(matchProps) => <Comments {...matchProps} isLogged={isLogged} />}
        />
        <Route
          exact
          path="/profile"
          component={() => <Profile isLogged={isLogged} />}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;