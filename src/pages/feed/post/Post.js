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
  return (
    <>
      <Card
        className="post"
        onClick={() => (window.location = `/Comment/${1}`)}
      >
        <CardHeader
          onClick={childClick}
          avatar={<Avatar aria-label="Recipe">R</Avatar>}
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
                        `http://localhost:3000/Comment/${1}`
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
          title="Best title"
          subheader="September 14, 2016"
        />
        <Typography paragraph>
          Morbi tellus lacus, elementum vitae mauris sit amet, mattis fringilla
          mi. Vivamus at eros posuere, pretium nisi in, posuere ipsum. Nullam
          diam nunc, elementum id justo ut, cursus lacinia tortor. Nulla
          facilisi. Nam porta, tortor auctor luctus ultricies, tortor felis
          luctus orci, sit amet lobortis nisi neque in felis. Etiam vitae elit
          fringilla, scelerisque ante et, placerat lorem. Sed cursus velit non
          lectus aliquet gravida. Duis ultricies lacus non eros scelerisque, sed
          accumsan nunc bibendum. Proin pellentesque ligula a nisi malesuada, ac
          suscipit quam accumsan. Ut nec magna diam. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Maecenas rhoncus nulla id ex euismod, vel egestas ligula
          sagittis. Maecenas sagittis porta interdum. Pellentesque ut luctus
          ipsum, id commodo nulla. Morbi eget tempus diam.
        </Typography>
        <CardActions onClick={childClick}>
          <IconButton onClick={() => (window.location = `/Comment/${1}`)}>
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
