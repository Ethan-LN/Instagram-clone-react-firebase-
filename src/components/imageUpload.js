import { Button } from "@mui/material";
import { useState } from "react";
import { storage, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";

export default function ImageUpload(props) {
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
        setProgress(progress);
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
            username: props.username,
          });
        });
      }
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a caption ..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
