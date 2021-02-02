import React, { useState } from "react";
import Login from "../login/Login";
import "./Nav.css";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Avatar } from "@material-ui/core";
import { auth } from "../../firebase";

export default function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

      {!props.isLogged ? (
        <Login />
      ) : (
        <div className="avatar">
          <IconButton onClick={handleClick}>
            <Badge badgeContent={4} color="primary" max={99}>
              <Avatar src={props.isLogged.photoURL} />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Popover>
        </div>
      )}
    </div>
  );
}
