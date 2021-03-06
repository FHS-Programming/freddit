import React, { useState } from 'react';
import Feed from './feed/Feed';
import AddPosticon from './AddPost/AddPostIcon';
import AddPostModal from './AddPost/Modal/AddPostModal';

export default function Home(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Feed isLogged={props.isLogged} />
      {props.isLogged ? (
        <>
          <AddPostModal close={handleClose} user={props.isLogged} openD={open} />
          <AddPosticon open={handleOpen} />
        </>
      ) : null}
    </>
  );
}
