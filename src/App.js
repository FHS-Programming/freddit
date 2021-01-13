import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import "./App.css";
import Profile from "./pages/userprofile/Profile";
import Nav from "./pages/nav/Nav";
import Sidebar from "./pages/sidebar/Sidebar";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase';
function App() {
  const [isLogged]=useAuthState(auth);

  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    if (sidebar) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        {sidebar ? <Sidebar toggle={toggleSidebar} /> : null}
        <Nav sidebar={toggleSidebar} isLogged={isLogged} />

        <Route exact path="/" component={Home} />
        <Route exact path="/profile" >
          <Profile isLogged={isLogged}/>
          </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
