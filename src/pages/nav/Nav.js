import React from "react";
import "./Nav.css";

export default function Nav(props) {
  return (
    <div className="nav">
      <div className="menu" onClick={props.sidebar}>
        <i className="fa fa-bars 5x"></i>
      </div>

      <div className="search">
        <i className="fa fa-search"></i>
        <input
		  type="text"
		  name="search"
          placeholder="Search"
		  maxLength="2048"
		  autoComplete="off"
          spellCheck="false"
        />
      </div>

      <div className="avatar">
        <i className="fa fa-user-circle-o"></i>
      </div>
    </div>
  );
}
