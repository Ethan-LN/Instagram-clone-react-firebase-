import { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import { auth } from "./firebase";
import { Button } from "@mui/material";
import { jsx, css } from "@emotion/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

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
        console.log(authUser);
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
      </div>

      {user ? (
        <Button onClick={()=> auth.signOut()}>LOGOUT</Button>
      ) : (
        <div className="app__login">
          <SignUpModal
            name="Sign Up"
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            user={user}
            setUser={setUser}
          />
          <LoginModal 
          name="Sign In"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword} 
          />
        </div>
      )}
      <h1>Hello, let us start to build with React🚀</h1>
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
  );
}

export default App;
