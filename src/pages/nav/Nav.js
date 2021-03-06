import React, { useEffect, useState } from "react";
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
import db, { auth } from "../../firebase";
import Sidebar from "../sidebar/Sidebar";
import Notification from "../notification/Notification";

import NotificationIcon from "../notification/NotificationIcon";

export default function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
 
  const toggleSidebar = () => {
    if (sidebar) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {sidebar ? (
        <Sidebar toggle={toggleSidebar} isLogged={props.isLogged} />
      ) : null}
      <div className="nav">
        <div className="menu" onClick={toggleSidebar}>
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
          <>
           <NotificationIcon user={props.isLogged} showNotification={showNotification} setShowNotification={setShowNotification}/> 
            {showNotification ? (
                <Notification
                  user={props.isLogged}
                />
            ) : null}
            <div className="avatar">
              <IconButton onClick={handleClick}>
                <Avatar src={props.isLogged.photoURL} />
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
                  <MenuItem>
                    <a href="/profile">Profile</a>
                  </MenuItem>
                  {/* <MenuItem>My account</MenuItem> */}
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
          </>
        )}
      </div>
    </>
  );
}
