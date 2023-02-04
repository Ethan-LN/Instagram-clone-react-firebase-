import { Button } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { useState } from 'react';
import { storage, db } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 



export default function ImageUpload(props) {

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
        );
        setProgress(progress);
      }, 
      (error) => {
        // Error function ...
        console.log(error);
        alert(error.message);
      },
      ()=> {
        // complete function ...
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // post image inside db
            // db.collection("posts").add({
            //   timestamp : firebase.Firestore.fieldValue.serverTimestamp(),
            //   caption:caption,
            //   imageUrl: url,
            //   username:props.username
            // })
            addDoc(collection(db, "posts"), {
              timestamp: serverTimestamp(),
              caption:caption,
              imageUrl: url,
              username:props.username
            });
          })
      }

    )
  }

  return (
    <div>
      <input type="text" placeholder='Enter a caption ...' onChange={event => setCaption(event.target.value)} value={caption}/>
      <input type="file" onChange={handleChange} />
      <Button className='imageupload__button' onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}
