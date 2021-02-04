import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./addpost.css";
import db, { storage } from "../../../firebase";
import firebase from "firebase";
import { v4 } from "uuid";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { FlareSharp } from "@material-ui/icons";

function AddPostModal(props) {
  const [postInput, setPostInput] = useState({
    title: "",
    body: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
  };

  let fileInput = React.createRef();
  const [pictureUpload, setPictureUPload] = useState(false);
  const submitPost = (e) => {
    e.preventDefault();
    const postref = db.collection("posts");
    const id = v4();
    let location = "pictures/" + props.user.uid + "/" + v4();
    let pictureRef = storage.ref(location);
    pictureRef.put(fileInput.current.files[0]).then((res) => {
      setPictureUPload(true);
    });
    if (pictureUpload){
    postref
      .add({
        title: postInput["title"],
        post: postInput["body"],
        user: props.user.displayName,
        userPhoto: props.user.photoURL,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        id: id,
        userId:props.user.uid,
        image: "gs://fhs-freddit.appspot.com/" + location,
      })
      .then((resp) => {
        setPostInput({
          title: "",
          body: "",
        });
        
        props.close();
      })
      .catch((err) => {
        console.log("Please try again");
      });
    }else{postref
      .add({
        title: postInput["title"],
        post: postInput["body"],
        user: props.user.displayName,
        userPhoto: props.user.photoURL,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        id: id,
        userId: props.user.uid,
      })
      .then((resp) => {
        setPostInput({
          title: "",
          body: "",
        });
        
        props.close();
      })
      .catch((err) => {
        console.log("Please try again");
      });
    }
  };
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
          <form
            autoComplete="off"
            className="addPostForm"
            onSubmit={submitPost}
          >
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
            <Button
              variant="contained"
              color="secondary"
              style={{width: '160px', backgroundColor: '#273046'}}
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload File
              <input
                ref={fileInput}
                id="upload-photo"
                name="upload-photo"
                type="file"
                hidden
              />
            </Button>
            {/* <label htmlFor="upload-photo">
              <Fab color="secondary"  variant="extended" component="span">
                <AddCircleRounded/>{"  "}
                Upload Image
              </Fab>
            </label> */}
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
