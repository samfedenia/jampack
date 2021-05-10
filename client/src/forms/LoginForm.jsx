import React from 'react';
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
};

export default function LoginForm() {
  return (
    <div style={style.root}>
      <div>
        <Typography variant='h4'>Sign In:</Typography>
      </div>
      <div>
        <TextField label='Email' id='margin-none' style={style.textField} />
      </div>
      <div>
        <TextField label='Password' id='margin-none' style={style.textField} />
      </div>
      <div>
        <Button variant='contained' color='secondary' style={style.button}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
