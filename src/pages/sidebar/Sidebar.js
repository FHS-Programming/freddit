import React from 'react';
import "./Sidebar.css";
import Overlay from "./Overlay";


export default function Sidebar(props) {
   const Bye =  () => {
    var hello = document.getElementById('sideBar');
     hello.classList.add('closeSB')
    setTimeout(() => {
     return props.toggle();
  }, 100);
  }

  return (
    <>
      <Overlay onClick={Bye} />
      <nav className="sideBar" id="sideBar">
        <div className="close" onClick={Bye}>
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
