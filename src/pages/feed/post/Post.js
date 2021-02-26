import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import AssignmentIcon from "@material-ui/icons/Assignment";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  CardContent,
} from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import db, { storage } from "../../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostSkeleton from "./PostSkeleton";

export default function Post(props) {
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likeAnchorEl, setlikeAnchorEl] = useState(null);

  const [image, setImage] = useState("");
  const likeRef = db.collection("likes");
  const notificationRef = db.collection("notification");
  const [userId, setUserId] = useState("1");
  const allLikeQuery = likeRef.where("postID", "==", props.post.id);
  const query = likeRef
    .where("userID", "==", userId)
    .where("postID", "==", props.post.id);
  const [likes] = useCollectionData(query);
  const [allLikes] = useCollectionData(allLikeQuery);

  const [likeList, setLikeList] = useState(false);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "edit-popover" : undefined;

  const likeId = open ? "like-popover" : undefined;
  if (props.post.image) {
    const gsRefrence = storage.refFromURL(props.post.image);
    gsRefrence.getDownloadURL().then((img) => {
      setImage(img);
    });
  }
  const childClick = (e) => {
    e.stopPropagation();
  };
  const clickedLike = (e) => {
    e.preventDefault(); // not useful
    if (!liked) {
      likeRef.add({
        postID: props.post.id,
        userID: props.isLogged.uid,
        user: props.isLogged.displayName,
      });
      notificationRef.add({
        postID: props.post.id,
        fromUID : props.isLogged.uid,
        fromUser: props.isLogged.displayName,
        fromPhoto: props.isLogged.photoURL,
        toUID: props.post.userId,
        action: "liked your",
        unRead: true,
      })
    } else {
      const like = likeRef
        .where("userID", "==", userId)
        .where("postID", "==", props.post.id)
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
  };

  const date = props.post.date.toDate().toString();
  const likeHover = (e) => {
    e.preventDefault();
    setLikeList(!likeList);
    setlikeAnchorEl(!likeList ? e.currentTarget : null);
  };

  return (
    <>
      <Card
        className="post"
        onClick={() => (window.location = `/Comment/${props.post.id}`)}
      >
        <CardHeader
          avatar={<Avatar src={props.post.userPhoto} onClick={childClick}/>}
          action={
            <span onClick={childClick}>
              <IconButton onClick={handleClick} style={{ cursor: "pointer" }}>
                <MoreVertIcon />
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
                  <MenuItem
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://fhs-freddit.web.app/Comment/${props.post.id}`
                      )
                    }
                  >
                    <ListItemIcon>
                      <AssignmentIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Copy Link" />
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <ReportIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                  </MenuItem>
                </MenuList>
              </Popover>
            </span>
          }
          title={<span onClick={childClick}>{props.post.user}</span>}
          subheader={`${date.substr(0, 15)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.post.title}
          </Typography>
          <Typography paragraph>{props.post.post}</Typography>
          {props.post.image ? (
            <>
              <div style={{ maxWidth: "400px" }}>
                <img
                  src={image}
                  style={{ height: "100%", width: "100%" }}
                  alt={props.post.title}
                />
              </div>
            </>
          ) : null}
        </CardContent>
        <CardActions onClick={childClick}>
          <IconButton
            onClick={() => (window.location = `/Comment/${props.post.id}`)}
          >
            <ModeCommentIcon />
          </IconButton>
          {props.isLogged ? (
            <>
              <IconButton
                onClick={clickedLike}
                color={!liked ? "default" : "secondary"}
              >
                <ThumbUpIcon color={!liked ? "default" : "secondary"} />
              </IconButton>
              <Popover
                id={likeId}
                // open={open}
                anchorEl={likeAnchorEl}
                open={likeList}
                onClose={likeHover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {allLikes ? (
                  <MenuList>
                    {allLikes.map((likes, i) => (
                      <>
                        <MenuItem>{likes.user}</MenuItem>
                      </>
                    ))}
                  </MenuList>
                ) : null}
              </Popover>
              {allLikes ? (
                <>
                  <span onClick={likeHover}>{allLikes.length}</span>
                </>
              ) : (
                "0"
              )}
            </>
          ) : (
            <>
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <Popover
                id={likeId}
                // open={open}
                anchorEl={likeAnchorEl}
                open={likeList}
                onClose={likeHover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {allLikes ? (
                  <MenuList>
                    {allLikes.map((likes, i) => (
                      <>
                        <MenuItem>{likes.user}</MenuItem>
                      </>
                    ))}
                  </MenuList>
                ) : null}
              </Popover>
              {allLikes ? (
                <>
                  <span onClick={likeHover}>{allLikes.length}</span>
                </>
              ) : (
                "0"
              )}
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
}
