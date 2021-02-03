import React, { useState } from "react";
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
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";

export default function Post(props) {
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "edit-popover" : undefined;

  // const clickCard = (e) => {
  //   window.location = "/Comment";
  // };
  const childClick = (e) => {
    e.stopPropagation();
  };
  const clickedLike = (e) => {
    e.preventDefault(); //not useful
    setLiked((prev) => !prev);
    // when the user clicks like
  };
  // console.log(props.post.date)
  const date = Date(props.post.date)
  // console.log(date)
  console.log(props.post.id);
  return (
    <>
      <Card
        className="post"
        onClick={() => (window.location = `/Comment/${props.post.id}`)}
      >
        <CardHeader
          onClick={childClick}
          avatar={<Avatar src={props.post.userPhoto}></Avatar>}
          action={
            <>
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
            </>
          }
          title={props.post.title}
          subheader={date.substr(0,15)}
        />
        <Typography paragraph>
          {props.post.post} 
        </Typography>
        <CardActions onClick={childClick}>
          <IconButton onClick={() => (window.location = `/Comment/${props.post.id}`)}>
            <ModeCommentIcon />
          </IconButton>
          {props.isLogged ? (
            <IconButton
              onClick={clickedLike}
              color={!liked ? "default" : "secondary"}
            >
              <ThumbUpIcon color={!liked ? "default" : "secondary"} />
            </IconButton>
          ) : (
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </>
  );
}
