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
import { Skeleton } from "@material-ui/lab";

export default function PostSkeleton(props) {
    return(
        <>
      <Card
        className="post"
      >
        <CardHeader
          avatar={<Avatar />}
        
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton variant="rect" height={30} />
          </Typography>
          <Typography paragraph><Skeleton variant="rect" height={30} /><Skeleton variant="rect" height={30} /></Typography>

        </CardContent>
      </Card>
    </>
    );
}