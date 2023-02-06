import { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { auth } from "./firebase";
import { Button } from "@mui/material";
import ImageUpload from "./components/ImageUpload";
import { InstagramEmbed } from 'react-social-media-embed';

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [signUp, setSignUp] = useState(false);
  const openSignUp = () => setSignUp(true);
  const closeSignUp = () => setSignUp(false);
  const [signIn, setSignIn] = useState(false);
  const openSignIn = () => setSignIn(true);
  const closeSignIn = () => setSignIn(false);

  // useEffect -> Runs a piece of code based on a specific conditions
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  //Keep login after refresh;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="instagram logo"
        />

{user? (
        <Button onClick={() => auth.signOut()}>LOGOUT</Button>
      ) : (
        <div className="app__login">
          <SignUpForm
            name="Sign Up"
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            user={user}
            setUser={setUser}
            signUp={signUp}
            openSignUp={openSignUp}
            closeSignUp={closeSignUp}
          />
          <LoginForm
            name="Sign In"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            signIn={signIn}
            openSignIn={openSignIn}
            closeSignIn={closeSignIn}
          />
        </div>
      )}
      </div>

      <h1>Hello, let us start to build with React🚀</h1>
      <div className="app__posts">
        <div className="app__postsLeft">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            alt={post.alt}
          />
        ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328}/>
        </div>
      </div>
      {user? (
      <ImageUpload username={user.displayName}/>):(
        <h3> Login to upload</h3>
      )}
    </div>
  );
}

export default App;
