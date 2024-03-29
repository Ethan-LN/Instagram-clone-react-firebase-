import { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { db } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { auth } from "./firebase";
import { Button } from "@mui/material";
import { InstagramEmbed } from "react-social-media-embed";
import ImageUpload from "./components/ImageUpload";

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
  const [createPost, setCreatePost] = useState(false);
  const openCreate = () => setCreatePost(true);
  const closeCreate = () => setCreatePost(false);

  // useEffect -> Runs a piece of code based on a specific conditions
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
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
        setEmail("");
        setPassword("");
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
        {user ? (
          <div className="app__loginOut">
            <ImageUpload
              name="Create Post"
              currentUser={user}
              createPost={createPost}
              openCreate={openCreate}
              closeCreate={closeCreate}
            />
            <Button onClick={() => auth.signOut()}>LOGOUT</Button>
          </div>
        ) : (
          <div className="app__loginOut">
            <SignUpForm
              name="Sign Up"
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              currentUser={user}
              setCurrentUser={setUser}
              signUp={signUp}
              openSignUp={openSignUp}
              closeSignUp={closeSignUp}
            />
            <LoginForm
              currentUser={user}
              name="Sign In"
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              signIn={signIn}
              openSignIn={openSignIn}
              closeSignIn={closeSignIn}
              setCurrentUser={setUser}
            />
          </div>
        )}
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              alt={post.alt}
              currentUser={user}
              setCurrentUser={setUser}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/CoAOeVUJoc_/"
            width={328}
          />
          <InstagramEmbed
            url="https://www.instagram.com/tv/Cg5LVOkp03A/"
            width={328}
          />
        </div>
      </div>
      <div className="app__footer">
        <center>
          <h6>©2023 Instagram clone (non-comercial) from Ethan-LN</h6>
        </center>
      </div>
    </div>
  );
}

export default App;
