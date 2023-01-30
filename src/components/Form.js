import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ValidationTextFields from './ValidateFrom';
import './Form.css';
import { Button, input } from '@mui/material';
import { bgcolor } from '@mui/system';
import { db,auth } from '../firebase';
import { useState } from 'react';

export default function Form(props) {
  const signUp = (event) =>{
    event.preventDefault();
    // auth.createUserWithEmailAndPassword(props.email,props.password)
    // .catch((error) => alert(error.message));
  }

  const [username, setUserName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [pwdValid, setPwdValid] = useState(false);

  const handleValidationUsername = (e) => {
    //set value to user input
    setUserName(e.target.username);
    
    //define regex     
    const reg = new RegExp("[a-z]");
    
    //test whether input is valid
    setNameValid(reg.test(e.target.value));
};

  return (
    <form className='form__layout'>
      <img
        className='form__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
    />
      <div className='textfield__layout'>
        <TextField
          required={true}
          error={!nameValid}
          id="filled-required"
          label="username"
          value={username}
          variant="filled"
          onChange={(e) => handleValidationUsername(e)}
        />
        <TextField
          required = {true}
          id="filled-email"
          label="email"
          // value={value}
          variant="filled"
          // onChange={(e) => handleValidation(e)}
        />
        <TextField
          required
          id="filled-password-input"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />

        <TextField
          required
          id="filled-password-input"
          label="confrim password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
      </div>
        <Button type="submit" fullWidth={true} className="btn__signUp" onClick={signUp}>Sign Up</Button>
    </form>
  );
}