import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ValidationTextFields from './ValidateFrom';
import './Form.css';
import { Button, Input, listItemIconClasses } from '@mui/material';
import { bgcolor } from '@mui/system';
import { db,auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Form(props) {
  const signUp = async (event) =>{
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, props.email, props.password)
    .catch((error) => alert(error.message));
  }

  // const [this.props.username, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("") ;
  // const [user,setUser] = useState(null);


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
          value={props.username}
          onChange={(e)=> this.props.setUserName(e.target.value)}
        />
        <Input 
          placeholder="email"
          type="text"
          value={props.email}
          onChange={(e)=> props.setEmail(e.target.value)}
        />
        <Input 
          placeholder="password"
          type="password"
          value={props.password}
          onChange={(e)=> props.setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp}>Sign Up</Button>
        </div>
    </form>
  );
}