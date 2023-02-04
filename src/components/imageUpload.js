import { Button } from '@mui/material';
import { useState } from 'react';
import { storage, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { uuidv4 } from '@firebase/util';

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
    // const uploadTask = storage.ref(`images/${image.name}`).put(image);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
        );
        setProgress(progress);
        console.log(progress);
      }, 
      (error) => {
        // Error function ...
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log("File doesn't exist");
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('User canceled the upload');
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log('Unknown error occurred, inspect the server response');
            break;
        }
        // console.log(error);
        // alert(error.message);
      },
      ()=> {
        // complete function ...
        getDownloadURL(ref(uploadTask,`images/${image.name}`))
        // ref(storage,`images/${image.name}`)
        // storage
        //   .ref("image")
        //   .child(image.name)
        //   .getDownloadURL()
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
