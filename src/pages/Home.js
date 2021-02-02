import React, { useState } from "react";
import Feed from "./feed/Feed";
import AddPosticon from "../pages/AddPost/AddPostIcon";
import AddPostModal from "../pages/AddPost/Modal/AddPostModal";

export default function Home(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("true");
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Feed />
      {props.isLogged ? (
        <>
          <AddPostModal close={handleClose} openD={open} />
          <AddPosticon open={handleOpen} />
        </>
      ) : null}
    </>
  );
}
