import * as React from "react";
import "./Form.css";
import { Button, Input } from "@mui/material";
import { auth } from "../firebase";
import Modal from "@mui/material/Modal";
import { db } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginForm(props) {

  const signIn = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      getDoc(doc(db, "userInfo", userCredential.user.uid)).then(docSnap => {
        if (docSnap.exists()) {
          updateProfile(userCredential.user, {displayName: docSnap.data().username})
        } else {
          console.log("No such document!");
        }
      })
    })
    .catch(
      (error) => alert(error.message)
    );
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
