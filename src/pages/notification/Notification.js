import React, {useEffect} from 'react';
import './Notification.css';
import db from '../../firebase';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';


export default function Notification(props){


  const notificationRef = db.collection("notification");
  const query = notificationRef.where("toUID", "==",props.user.uid)

  const [notifications] = useCollectionData(query);
    if(notifications ){
      if(notifications.length>0){
    return (
        <>
<List component="nav" className="notificationList">
{notifications.map((notif, i)=>(
  <>
        <a href={"/comment/"+notif.postID} style={{"color":"white"}}>
          <ListItem button >
            <ListItemAvatar>
              <Avatar src={notif.fromPhoto}/>
            </ListItemAvatar>
            <ListItemText className="notificationListItem" primary={notif.fromUser} secondary={notif.action + " post"}/>
          </ListItem></a>
        </>))}
   </List>
        </>
    );}
    else{
      return <></>;
    }
  }
    else{
      return null;
    }
}