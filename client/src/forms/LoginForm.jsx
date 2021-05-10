import React, { useState } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';

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

export default function LoginForm() {
  const [data, setData] = useState({ email: '', password: '' });

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
          <Typography variant='h4'>Sign In:</Typography>
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
          <Button
            variant='contained'
            color='secondary'
            style={style.button}
            type='submit'
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
