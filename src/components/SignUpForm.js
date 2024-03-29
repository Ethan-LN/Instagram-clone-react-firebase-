import * as React from "react";
import "./Form.css";
import { Button, Input } from "@mui/material";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "@mui/material/Modal";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function SignUpForm(props) {
  const signUp = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, props.email, props.password)
      .then((authUser) => {
        setDoc(doc(db, "userInfo", authUser.user.uid), {
          timestamp: serverTimestamp(),
          username: props.username,
        });
        return (authUser.user.displayName = props.username);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <Button onClick={props.openSignUp}>{props.name} </Button>
      <Modal open={props.signUp} onClose={props.closeSignUp}>
        <form className="form__layout">
          <img
            className="form__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            alt="instagram logo"
          />
          <div className="textfield__layout">
            <Input
              placeholder="username"
              type="text"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
            />
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
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
