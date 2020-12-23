import React from "react";
import "./Sidebar.css";
import Overlay from "./Overlay";


export default function Sidebar(props) {
  return (
    <>
      <Overlay onClick={props.toggle} />
      <nav className="sideBar" id="sideBar">
        <div className="close" onClick={props.toggle}>
          X
        </div>
        <ul>
          <li>
            <a href="/">Hello World</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
