import React from "react";
import "./Sidebar.css";
import Overlay from "./Overlay";
import CloseIcon from "@material-ui/icons/Close";

function Sidebar(props) {
  const Bye = () => {
    var hello = document.getElementById("sideBar");
    hello.classList.add("closeSB");
    setTimeout(() => {
      return props.toggle();
    }, 100);
  };

  return (
    <>
      <Overlay onClick={Bye} />
      <nav className="sideBar" id="sideBar">
        <div className="close" onClick={Bye}>
          <CloseIcon color={"secondary"} />
        </div>
        <ul>
          <li>
            <h2>Menu</h2>
          </li>
          <li>
            <a href="/">Home Page</a>
            <a href="/profile">Profile Page</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
