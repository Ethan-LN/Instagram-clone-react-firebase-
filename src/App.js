import { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username:'Dan Hunter', 
      caption:' The splashing moment', 
      imageUrl:'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      alt:'splash'
    },
    {
      username:'Micheal Black', 
      caption:' The colorful drawing',
      imageUrl:'https://images.unsplash.com/photo-1598112152680-0c39a2928c64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt:'colorful'
    },
    {
      username:'Warren Smith',
      caption:' Art work -- a paint',
      imageUrl:'https://images.unsplash.com/photo-1529405456913-530d6c6d2966?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt:'paint'
    }
  ]);

  return (
    <div className='app'>
      <div className='app__header'> 
      <img
        className='app__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
      />
      </div>
      <h1>Hello, let us start to build with React🚀</h1>
      {
        posts.map(post =>(
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} alt={post.alt}/>
        ))
      }
      </div>

  );
}

export default App;
