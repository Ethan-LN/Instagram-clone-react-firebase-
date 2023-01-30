import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ValidationTextFields from './ValidateFrom';
import './Form.css';
import { Button, Input } from '@mui/material';
import { bgcolor } from '@mui/system';
import { db,auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

export default function Form(props) {
  const signUp = (event) =>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));
  }

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <form className='form__layout'>
      <img
        className='form__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
    />
      <div className='textfield__layout'>
        <Input 
          placeholder="username"
          type="text"
          value={username}
          onChange={(e)=> setUserName(e.target.value)}
        />
        <Input 
          placeholder="email"
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <Input 
          placeholder="password"
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
        </div>
    </form>
  );
}