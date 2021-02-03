import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./addpost.css";
import db from '../../../firebase';
import firebase from 'firebase';
import {v4} from 'uuid';

function AddPostModal(props) {
  const [postInput, setPostInput] = useState({
    title: "",
    body: "",
  })
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    const postref = db.collection('posts');
    const id = v4();
    postref.add({
      title: postInput['title'],
      post: postInput['body'],
      user: props.user.displayName,
      userPhoto: props.user.photoURL,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      id: id,
    }).then(resp => {
      // console.log(resp);
      props.close();
    }).catch(err=>{
      console.log(err);
    })
    // console.log(postInput)
  }
  return (
    <Modal
      className="modalContainer"
      open={props.openD}
      onClose={props.close}
      aria-labelledby="modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.openD}>
        <div className="modal">
          <h2 id="modal-title">Something Modal</h2>
          <form autoComplete="off" className="addPostForm" onSubmit={submitPost}>
            <TextField
              id="standard-multiline-flexible"
              label="Title"
              name="title"
              value={postInput.title}
              onChange={onChangeInput}
              multiline
              rowsMax={1}
              variant="filled"
            />
            <TextField
              id="filled-multiline-static"
              label="Send a post"
              name="body"
              value={postInput.body}
              onChange={onChangeInput}
              multiline
              rows={8}
              variant="filled"
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default AddPostModal;
