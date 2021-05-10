import React from 'react';
import { Paper } from '@material-ui/core';
import SignupForm from './forms/SignupForm';

function Signup() {
  const style = {
    root: {
      height: '100vh',
    },
  };
  return (
    <>
      <Paper elevation={3} variant='outlined' style={style.root}>
        <SignupForm />
      </Paper>
    </>
  );
}

export default Signup;
