import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ValidationTextFields from './ValidateFrom';
import './Form.css';
import { Button, input } from '@mui/material';
import { bgcolor } from '@mui/system';

export default function Form(props) {
  const SignUp = () =>{

  }
  return (
    <form className='form__layout'>
      <img
        className='form__headerImage'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
        alt='instagram logo'
    />
      <div className='textfield__layout'>
        <TextField
          required
          id="filled-required"
          label="username"
          variant="filled"
        />
        <TextField
          required
          id="filled-email"
          label="email"
          variant="filled"
        />
        <TextField
          fullWidth={true}
          required
          id="filled-password-input"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
      </div>
        <Button fullWidth={true} className="btn__signUp" onClick={SignUp}>Sign Up</Button>
    </form>
  );
}