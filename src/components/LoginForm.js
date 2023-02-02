import * as React from "react";
import "./Form.css";
import { Button, Input } from "@mui/material";
import { auth } from "../firebase";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm(props) {
  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, props.email, props.password).catch(
      (error) => alert(error.message)
    );
    props.closeSignIn();
  };

  return (
    <div>
      <Button onClick={props.openSignIn}>{props.name} </Button>
      <Modal open={props.signIn} onClose={props.closeSignIn}>
        <form className="form__layout">
          <img
            className="form__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            alt="instagram logo"
          />
          <div className="textfield__layout">
            <Input
              placeholder="email"
              type="text"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Login
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
