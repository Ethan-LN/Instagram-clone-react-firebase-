import { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import BasicModal from './components/Modal';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emial, setEmail] = useState('');
  
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
      <div className='app__header'> 
      <img
        className='app__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
      />
      </div>
      <div className='app__login'>
        <BasicModal name='Sign Up' />
        <BasicModal name='Sign In'/>
      </div>
      <h1>Hello, let us start to build with React🚀</h1>
      {
        posts.map(({id, post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} alt={post.alt}/>
        ))
      }
  </div>

  );
}

export default App;
