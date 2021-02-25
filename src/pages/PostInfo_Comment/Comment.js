import React, { useEffect, useState } from "react";
import "./Comment.css";
import {
  Grid,
  Avatar,
  Typography,
  Box,
  Card,
  CardHeader,
  CardActionArea,
  Divider,
  TextField,
  IconButton,
  Backdrop,
  Popover,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import {
  MoreVert,
  ModeComment,
  Assignment,
  Report,
  ThumbUp,
} from "@material-ui/icons";

import SendIcon from "@material-ui/icons/Send";
import db, { storage } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function Comment(props) {
  const classes = useStyles();
  const [commentInput, setCommentInput] = useState("");
  const postRef = db.collection("posts");
  const commentsRef = db.collection("comments");
  const query = postRef.where("id", "==", props.match.params.id);
  const [post] = useCollectionData(query);
  const commentQuery = commentsRef.where("postID", "==", props.match.params.id);
  const [comments] = useCollectionData(commentQuery);
  const [image, setImage] = useState("");
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState("1");

  const likeRef = db.collection("likes");
  const allLikeQuery = likeRef.where("postID", "==", props.match.params.id);
  const query2 = likeRef
    .where("userID", "==", userId)
    .where("postID", "==", props.match.params.id);
  const [allLikes] = useCollectionData(allLikeQuery);
  const [likes] = useCollectionData(query2);

  useEffect(() => {
    if (props.isLogged) {
      setUserId(props.isLogged.uid);
    }
    if (likes) {
      if (likes.length >= 1) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [likes]);

  const clickedLike = (e) => {
    e.preventDefault(); // not useful
    if (post[0]) {
      if (!liked) {
        likeRef.add({
          postID: post[0].id,
          userID: props.isLogged.uid,
          user: props.isLogged.displayName,
        });
      } else {
        const like = likeRef
          .where("userID", "==", userId)
          .where("postID", "==", post[0].id)
          .get()
          .then((resp) => {
            resp.forEach((doc) =>
              likeRef
                .doc(doc.id)
                .delete()
                .then(() => {})
                .catch(() => {
                  alert("Error");
                })
            );
          });
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openthis = Boolean(anchorEl);
  const id = openthis ? "edit-popover" : undefined;

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
  var date = "00-00-0000";
  if (post && comments) {
    date = post[0].date.toDate().toString();
    if (post[0].image) {
      const gsRefrence = storage.refFromURL(post[0].image);
      gsRefrence.getDownloadURL().then((img) => {
        setImage(img);
      });
    }
    return (
      <div className="CCMContain">
        <div className="CCMBackCOnt">
          <Button color="primary" href="https://fhs-freddit.web.app/">Go back</Button>
        </div>
        <Card className="commentContainer">
          <CardHeader
            avatar={<Avatar src={post[0].userPhoto} />}
            title={post[0].user}
            subheader={`${date.substr(0, 15)}`}
            action={
              <>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
                <Popover
                  id={id}
                  open={openthis}
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
                    <MenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://fhs-freddit.web.app/Comment/${post[0].id}`
                        )
                      }
                    >
                      <ListItemIcon>
                        <Assignment fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Copy Link" />
                    </MenuItem>

                    <MenuItem>
                      <ListItemIcon>
                        <Report fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Report" />
                    </MenuItem>
                  </MenuList>
                </Popover>
              </>
            }
          />
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              {post[0].title}
            </Typography>
            <Typography paragraph>{post[0].post}</Typography>
            <div component="span">
              {image ? (
                <>
                  {imageFullScreen ? (
                    <>
                      <Backdrop
                        open={imageFullScreen}
                        className={classes.backdrop}
                        onClick={() => setImageFullScreen(false)}
                      />
                      <img
                        src={image}
                        className="fullScreenImage"
                        onDoubleClick={() => window.open(`${image}`)}
                      />
                    </>
                  ) : null}
                  <div style={{ maxWidth: "600px" }}>
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => setImageFullScreen(true)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <Grid container alignItems="center">
            <Grid item>
              <CardActionArea style={{ width: "fit-content" }}>
                <a href="#commentsA" className="linkComment">
                  <Box
                    display="flex"
                    alignItems="center"
                    p={1}
                    alignItems="center"
                  >
                    <ModeComment />
                    &nbsp;&nbsp;Comments
                  </Box>
                </a>
              </CardActionArea>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center" p={1} alignItems="center">
                {!props.isLogged ? (
                  <IconButton color={"default"}>
                    <ThumbUp color={"default"} />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      color={!liked ? "default" : "secondary"}
                      onClick={clickedLike}
                    >
                      <ThumbUp color={!liked ? "default" : "secondary"} />
                    </IconButton>
                    {allLikes ? <span>{allLikes.length}</span> : <span>0</span>}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
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
