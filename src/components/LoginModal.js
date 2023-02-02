import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function LoginModal(props) {
    const [signin, SetUpSignin] = useState(false);
    const handleOpen = () => SetUpSignin(true);
    const handleClose = () => SetUpSignin(false);
  return (
    <div>
      <Button onClick={handleOpen}>{props.name} </Button>
      <Modal open={signin} onClose={handleClose}>
        <div>
          <LoginForm
            user={props.user}
            username={props.username}
            setUsername={props.setUsername}
            email={props.email}
            password={props.password}
            setUser={props.setUser}
            setEmail={props.setEmail}
            setPassword={props.setPassword}
            handleClose = {handleClose}
            createa-account="create-new-account"

          />
        </div>
      </Modal>
    </div>
  )
}