import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

function Post({ postId, username, caption, imageUrl, alt, currentUser }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [postId]
  );

  const handleComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    // add comment to firebase Post.Comments
    await addDoc(collection(db, "posts", postId, "comments"), {
      username: currentUser.displayName,
      text: commentToSend,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          sx={{ width: 38, height: 38, bgcolor: deepOrange[500] }}
          alt={username}
          src="/broken-image.jpg"
        />
        <div className="post__username">{username}</div>
      </div>
      {/* header -> avatar + username */}
      <img className="post__image" src={imageUrl} alt={alt} />
      {/* image */}
      <div className="post__text">
        <strong>{username}</strong>
        {":   " + caption}
      </div>
      {/* username + caption */}
      <div className="post_icons">
        {/* icons obtained from the instagram website */}
        <div>
          <svg
            aria-label="Like"
            className="_ab6-"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
          </svg>
        </div>
        <div>
          <svg
            aria-label="Comment"
            className="_ab6-"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </div>
        <div>
          <svg
            aria-label="Share Post"
            className="_ab6-"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <line
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="22"
              x2="9.218"
              y1="3"
              y2="10.083"
            ></line>
            <polygon
              fill="none"
              points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </div>
      </div>
      <div>
        {comments.length > 0 && (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="post_commentDisplay">
                <p>
                  <b> {comment.data().username} </b>
                  {comment.data().text}{" "}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {currentUser ? (
        <div className="post__commentBox">
          <input
            className="post__comment"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            className="post__button"
            type="submit"
            disabled={!comment.trim()}
            color="warning"
            onClick={handleComment}
          >
            Post
          </button>
        </div>
      ) : (
        <div className="post__commentBox">
          <input
            disabled
            className="post__comments"
            type="text"
            placeholder="Login to add comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            className="post__button"
            type="submit"
            disabled
            color="warning"
            onClick={handleComment}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
