import React, { useState } from "react";
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

function Comment(props) {
  const [commentInput, setCommentInput] = useState("");
  // console.log(props.match.params.id)

  const handleChange = (event) => {
    setCommentInput({ value: event.target.value });
  };
  
  //submit comment
  const submitHander = (e) => {
    e.preventDefault();
  };
  return (
    <div className="CCMContain">
      <div className="commentContainer">
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar aria-label="Recipe">R</Avatar>
          </Grid>
          <Grid item>Posted by</Grid>
        </Grid>
        <br />
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
        <Grid container spacing={2}>
          <CardActionArea style={{ width: "fit-content" }}>
            <a href="#commentsA" className="linkComment">
              <Box display="flex" alignItems="center" p={1} alignItems="center">
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
              onChange={handleChange}
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
          <div className="commentDivider">
            <Grid container spacing={2} justify="flex-start">
              <Grid item>
                <Avatar>R</Avatar>
              </Grid>
              <Grid item xs={6}>
                <span className="commentUser">Username</span>
                <p className="commentText">Comment</p>
              </Grid>
            </Grid>
          </div>
          <div className="commentDivider">
            <Grid container spacing={2} justify="flex-start">
              <Grid item>
                <Avatar>R</Avatar>
              </Grid>
              <Grid item xs={6}>
                <span className="commentUser">Username</span>
                <p className="commentText">Comment</p>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
