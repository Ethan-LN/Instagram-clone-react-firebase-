import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SignUpForm from "./SignUpForm";

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

export default function SignUpModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{props.name} </Button>
      <Modal open={open} onClose={handleClose}>
        <div>
          <SignUpForm
            user={props.user}
            username={props.username}
            setUsername={props.setUsername}
            email={props.email}
            password={props.password}
            setUser={props.setUser}
            setEmail={props.setEmail}
            setPassword={props.setPassword}
            createa-account="create-new-account"

          />
        </div>
      </Modal>
    </div>
  );
}
