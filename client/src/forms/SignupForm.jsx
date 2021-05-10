import React, { useState } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import TermsCheckbox from './TermsCheckbox';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    width: '50ch',
    margin: '8px',
  },
  button: {
    margin: '1rem',
    width: '10rem',
    backgroundColor: 'green',
  },
  form: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

export default function SignupForm() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [data, setData] = useState({ email: '', password: '' });

  function toggleButton() {
    setButtonDisabled(!buttonDisabled);
  }
  function onChange(ev) {
    setData({ ...data, [ev.target.name]: ev.target.value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log('email', data.email, 'password', data.password);
    setData({ ...data, email: '', password: '' });
  }

  return (
    <div style={style.root}>
      <form onSubmit={onSubmit} autoComplete='off' style={style.form}>
        <div>
          <Typography variant='h4'>Create an account:</Typography>
        </div>

        <div>
          <TextField
            label='Email'
            id='margin-none'
            style={style.textField}
            onChange={onChange}
            name='email'
            type='email'
            value={data.email}
          />
        </div>
        <div>
          <TextField
            label='Password'
            id='margin-none'
            style={style.textField}
            onChange={onChange}
            name='password'
            type='password'
            value={data.password}
          />
        </div>
        <div>
          <TermsCheckbox toggleButton={toggleButton} />
        </div>
        <div>
          <Button
            disabled={buttonDisabled}
            variant='contained'
            color='secondary'
            style={style.button}
            type='submit'
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
