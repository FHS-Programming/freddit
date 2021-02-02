import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./addpost.css";

function AddPostModal(props) {
  const [postInput, setPostInput] = useState({
    title: "",
    body: "",
  })

  const submitPost = () => {
    // submit post
    console.log(postInput)
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
          <form autoComplete="off" className="addPostForm" onClick={submitPost}>
            <TextField
              id="standard-multiline-flexible"
              label="Title"
              name="title"
              value={postInput.title}
              onChange={() => setPostInput({title: this.value})}
              multiline
              rowsMax={1}
              variant="filled"
            />
            <TextField
              id="filled-multiline-static"
              label="Send a post"
              value={postInput.body}
              onChange={() => setPostInput({body: this.value})}              
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
