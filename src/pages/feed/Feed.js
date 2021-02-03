import React, { useEffect, useState } from "react";
import Post from "./post/Post";
import db from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Skeleton } from "@material-ui/lab";

export default function Feed({ isLogged }) {
  const postRef = db.collection("posts");
  const [posts] = useCollectionData(postRef);

  console.log(posts);
  if (posts) {
    return (
      <>
        <div className="feed">
          {posts.map((post, i) => (
            <Post isLogged={isLogged} post={post} key={i}/>
          ))}
        </div>
      </>
    );
  } else {
	  return(
	  <>
	  	<Skeleton variant="circle" height={100}/>
		  <Skeleton color="secondary" animation="wave" variant="rect" height={300} width={900}/>
		</>	);
  }
}
