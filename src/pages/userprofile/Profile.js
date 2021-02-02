import React, { useState } from "react";
import "./Profile.css";
import image from "../../hollingsbot.jpg";
import Avatar from "@material-ui/core/Avatar";

import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import AppBar from "@material-ui/core/AppBar";

export default function Profile(props) {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="profile">
        <div className="profilePicture">
          <div>
            {props.isLogged ? (
              <>
                <Avatar
                  alt={props.isLogged.displayName || "P"}
                  src={props.isLogged.photoURL}
                />
                <h6>{props.isLogged.displayName}</h6>
              </>
            ) : (
              <>
                <Avatar alt="Remy Sharp" src={image} />
                <h6>Username</h6>
              </>
            )}
          </div>
          <div className="profileInfo">
            <h6>Date Joined: </h6>
            <h6>Days: </h6>
            <h6>Title: </h6>
          </div>
        </div>
        <TabContext value={value}>
          <AppBar position="static">
            <TabList onChange={handleChange} aria-label="simple tabs example"  variant="fullWidth">
              <Tab label="Liked Post" value="1" />
              <Tab label="Your Post" value="2" />
            </TabList>
          </AppBar>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </div>
    </>
  );
}
