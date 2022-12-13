import { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  
  // useEffect -> Runs a piece of code based on a specific conditions
  useEffect(()=>{

     onSnapshot(collection(db,'posts'), (snapshot) => {
       setPosts(snapshot.docs.map(doc => ({
          id: doc.id, 
          post: doc.data()
        })));
       })
  },[]);


  return (
    <div className='app'>
      <form>
      {/* <Modal
        open={open}
        onClose={()=> setOpen(false)}
      > 
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal</h2>
        </div>
        </Modal> */}
        </form>
      <div className='app__header'> 
      <img
        className='app__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
      />
      </div>
      <h1>Hello, let us start to build with React🚀</h1>
      {
        posts.map(({id, post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} alt={post.alt}/>
        ))
      }/
      </div>

  );
}

export default App;
