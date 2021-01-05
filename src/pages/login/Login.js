import React, { useState } from "react";
import "./Login.css";

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
          <input type="sumbit" value="Login"/>
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
      <button className="login_button" onClick={loginClick}>
        Log<span className="in_login">in</span>
      </button>{" "}
      <br />
      {loginModal ? <LoginModal /> : null}
      {/* <button className="login_button">Log<span className="in_login">out</span></button></> */}
    </>
  );
}
