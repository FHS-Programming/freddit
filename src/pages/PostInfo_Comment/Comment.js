import React, { useEffect, useState } from "react";
import "./Comment.css";
import {
  Grid,
  Avatar,
  Typography,
  Box,
  CardActionArea,
  Divider,
  TextField,
  IconButton,
} from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import SendIcon from "@material-ui/icons/Send";
import db, { storage } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Comment(props) {
  const [commentInput, setCommentInput] = useState("");
  const postRef = db.collection("posts");
  const commentsRef = db.collection("comments");
  const query = postRef.where("id", "==", props.match.params.id);
  const [post] = useCollectionData(query);
  const commentQuery = commentsRef.where("postID", "==", props.match.params.id);
  const [comments] = useCollectionData(commentQuery);
  const [image, setImage] = useState("");
  //submit comment
  // console.log(props.isLogged)
  // console.log(comments)

  // useEffect (()=>{
  //   commentsRef.where("postID","==",props.match.params.id).get().then(resp=>{
  //     console.log(resp.data());
  //   })},[]);

  const submitHander = (e) => {
    commentsRef
      .add({
        postID: props.match.params.id,
        user: props.isLogged.displayName,
        photoURL: props.isLogged.photoURL,
        comment: commentInput,
      })
      .then((res) => {
        setCommentInput("");
      });
  };
  const pressedEnter = (e) => {
    if (e.keyCode === 13) {
      submitHander();
    }
  };

  if (post && comments) {
    if (post[0].image) {
      const gsRefrence = storage.refFromURL(post[0].image);
      gsRefrence.getDownloadURL().then((img) => {
        setImage(img);
      });
    }
    return (
      <div className="CCMContain">
        <div className="commentContainer">
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={post[0].userPhoto} />
            </Grid>
            <Grid item>{post[0].user}</Grid>
          </Grid>
          <br />
          <Typography paragraph>{post[0].post}</Typography>
          <Box component="span" m={1}>
            {image ? (
              <>
                <a href={image} target="_blank">
                  <img src={image} style={{ height: "40%", width: "50%" }} />
                </a>
              </>
            ) : null}
          </Box>

          <Grid container spacing={2}>
            <CardActionArea style={{ width: "fit-content" }}>
              <a href="#commentsA" className="linkComment">
                <Box
                  display="flex"
                  alignItems="center"
                  p={1}
                  alignItems="center"
                >
                  <ModeCommentIcon />
                  &nbsp;&nbsp;Comments
                </Box>
              </a>
            </CardActionArea>
          </Grid>
        </div>
        <div className="commentContainer">
          {!props.isLogged ? (
            <Grid container alignItems="center" className="closedComment">
              <Grid items xs={10} spacing={2}>
                Log in or sign up to leave a comment
              </Grid>
            </Grid>
          ) : (
            <div className="loggedComment">
              <TextField
                className="commentInput"
                variant="outlined"
                placeholder="Add a comment"
                value={commentInput}
                onKeyDown={pressedEnter}
                onChange={(e) => setCommentInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={submitHander}>
                      <SendIcon color="primary" />
                    </IconButton>
                  ),
                }}
              />
            </div>
          )}

          <br />
          <Divider />
          <br />
          <div id="commentsA">
            {comments.map((comment, i) => (
              <div className="commentDivider" key={i}>
                <Grid container spacing={2} justify="flex-start">
                  <Grid item>
                    <Avatar src={comment.photoURL}></Avatar>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="commentUser">{comment.user}</span>
                    <p className="commentText">{comment.comment}</p>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Comment;
