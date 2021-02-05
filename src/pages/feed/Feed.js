import React from "react";
import Post from "./post/Post";
import db from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Skeleton } from "@material-ui/lab";
import "./Feed.css";
import PostSkeleton from "./post/PostSkeleton";

function Feed({ isLogged }) {
  const postRef = db.collection("posts");
  const query = postRef.orderBy("date");
  const [posts] = useCollectionData(query);
  return (
    <div className="feed">
      {posts &&
        posts
          .reverse()
          .map((post, i) => <Post isLogged={isLogged} post={post} key={i} />)}

      {!posts ? (
        <>
          <PostSkeleton/>
        </>
      ) : null}
    </div>
  );
}
export default Feed;