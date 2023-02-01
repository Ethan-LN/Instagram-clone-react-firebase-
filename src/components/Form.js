import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ValidationTextFields from './ValidateFrom';
import './Form.css';
import { Button, Input, listItemIconClasses } from '@mui/material';
import { bgcolor } from '@mui/system';
import { db,auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Form(props) {
  const signUp = async (event) =>{
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));
  }

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("") ;
  const [user,setUser] = useState(null);


  //Keep login after refresh;

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((authUser)=> {
      if (authUser) {
        console.log(authUser)
        setUser(authUser);
      } else {
        setUser(null);
      }
      });
      return () => {
        unsubscribe();
      };
    },[user, username]);

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