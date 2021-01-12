import React, { useState } from "react";
import "./Login.css";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge"

function LoginModal() {
  return (
    <>
      <div className="login-modal">
        <form className="login-form">
          <div className="form-group">
            <label className="label">Email: </label>
            <input type="text" name="email" />
          </div>
          <div className="form-group">
            <label className="label">Password: </label>
            <input type="password" name="password" />
          </div>
          <div className="form-group">
            <input type="sumbit" value="Login" />
          </div>
        </form>
        <div className="other-sign-in">
          <button>Gmail</button>
          <button>Github</button>
        </div>
      </div>
    </>
  );
}

export default function Login() {
  const [loginModal, setLoginModal] = useState(false);

  const loginClick = () => {
    return loginModal ? setLoginModal(false) : setLoginModal(true);
  };
  return (
    <>
      <IconButton onClick={loginClick}>
        <Badge  color="primary" max={99}>
          <AccountCircleIcon fontSize="large" />
        </Badge>
      </IconButton>
      <br />
      {loginModal ? <LoginModal /> : null}
      {/* <button className="login_button">Log<span className="in_login">out</span></button></> */}
    </>
  );
}
