import { Button } from "@mui/material";
import { useState } from "react";
import { storage, db } from "../firebase";
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

  let imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/instagram-clone-42aea.appspot.com/o/images%2Finstagram-background.jpeg?alt=media&token=456a1124-7dbe-450d-a390-3a40fa4c4c24";

  // upload function
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
          imageUrl = url;

        ///post function
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
      <Modal open={props.createPost} onClose={props.closeCreate}>
        <form className="form__layout">
          <img className="post__image" src={imageUrl} alt={"upload"}/>
          <progress
            className="imageUpload__progress"
            value={progress}
            max="100"
          />
          <div className="textfield__layout">
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
            <div className="button__layout">
              <Button className="imageupload__button" onClick={handleUpload}>
                Upload
              </Button>
              <Button className="imageupload__button" onClick={handleUpload}>
                Post
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ImageUpload;
