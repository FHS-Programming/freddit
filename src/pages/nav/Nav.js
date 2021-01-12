import React from "react";
import Login from "../login/Login";
import "./Nav.css";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

export default function Nav(props) {
  return (
    <div className="nav">
      <div className="menu" onClick={props.sidebar}>
        <IconButton>
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="search">
        <input
          type="text"
          name="search"
          placeholder="Search"
          maxLength="2048"
          autoComplete="off"
          spellCheck="false"
        />
        <SearchIcon />
      </div>

      {props.isLogged ? (
        <Login />
      ) : (
        <div className="avatar">
          <IconButton>
            <Badge badgeContent={4} color="primary" max={99}>
              <AccountCircleIcon fontSize="large" />
            </Badge>
          </IconButton>
        </div>
      )}
    </div>
  );
}
