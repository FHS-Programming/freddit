import React from "react";
import "./Notification.css";
import db from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Divider
} from "@material-ui/core";

export default function Notification(props) {
  const notificationRef = db.collection("notification");
  const query = notificationRef.where("toUID", "==", props.user.uid);
  const [notifications] = useCollectionData(query);
  if (notifications) {
    if (notifications.length > 0) {
      return (
          <Popover
          className={"notonotifi"}
            open={props.showNotification}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List className="notificationList">
              {notifications.map((notif, i) => (
                <a
                  href={"/comment/" + notif.postID}
                  style={{ color: "white" }}
                  key={i}
                >
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar src={notif.fromPhoto} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={notif.fromUser}
                      secondary={notif.action + " post"}
                    />
                  </ListItem>
                  <Divider light style={{backgroundColor: '#ffffff38'}}/>
                </a>
              ))}
            </List>
          </Popover>
      );
    } else {
      return <></>;
    }
  } else {
    return null;
  }
}
