import React from 'react'
import './Post.css';
import Avatar from '@mui/material/Avatar';

function Post() {
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar
                className='post__avatar'
                alt='Dan Hunter'
                src='/static/images/avatar/1.jpg'
            />
            <h3>Username</h3>
        </div>
        {/* header -> avatar + username */}
        <img className='post__image' src='https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80' alt='splash'/>
        {/* image */}
        <h4 className='post__text'><strong>Dan Hunter</strong> The splash moment</h4>
        {/* username + caption */}
    </div>
  )
}

export default Post