import React from "react";
import "./Profile.css";
import image from "../../hollingsbot.jpg";

export default function Profile(props) {
  return (
    <>
      <div className="profile">
        <div className="profilePicture">
          <img src={image} />
          <div className="userName">Username</div>
        </div>
      </div>
    </>
  );
}
