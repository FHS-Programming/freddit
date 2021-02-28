import { Badge, IconButton } from "@material-ui/core";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import NotificationsIcon from "@material-ui/icons/Notifications";

export default function NotificationIcon(props) {
  const notificationRef = db.collection("notification");
  const unreadQuery = notificationRef
    .where("toUID", "==", props.user.uid)
    .where("unRead", "==", true);
  const [unreadNotifications] = useCollectionData(unreadQuery);
  if (unreadNotifications) {
    return (
      <IconButton>
        <Badge badgeContent={unreadNotifications.length} color="primary">
          <NotificationsIcon
            fontSize="large"
            onClick={props.onNotiClick}
          />
        </Badge>
      </IconButton>
    );
  } else {
    return (
      <IconButton>
        <NotificationsIcon
          fontSize="large"
          onClick={props.onNotiClick}
        />
      </IconButton>
    );
  }
}
