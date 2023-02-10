import { Button } from "@mui/material";
import { useState } from "react";
import { storage, db } from "../firebase";
import "./ImageUpload.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import Modal from "@mui/material/Modal";
import "./Form.css";

function ImageUpload(props) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        setProgress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: props.currentUser.displayName,
          });
          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    );
  };

  return (
    <div>
      <Button onClick={props.openCreate}>{props.name}</Button>
      <Modal open={props.createPost} onClose={props.closeCreate} >
        <form className="form__layout">
          <progress
            className="imageUpload__progress"
            value={progress}
            max="100"
          />
          <input
            type="text"
            placeholder="Enter a caption ..."
            onChange={(event) => {
              if (event.target.value === null) {
                setCaption(null);
              } else {
                setCaption(event.target.value);
              }
            }}
            value={caption}
          />
          <input type="file" onChange={handleChange} />
          <Button className="imageupload__button" onClick={handleUpload}>
            Upload
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default ImageUpload;
