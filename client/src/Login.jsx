import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import LoginForm from './forms/LoginForm';

const style = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    paddingTop: '1rem',
    paddingBottom: '2rem',
    color: 'darkGreen',
  },
  root: {
    height: '100vh',
  },
};

function Login() {
  return (
    <div>
      <Paper elevation={3} variant='outlined' style={style.root}>
        <LoginForm />
        <Typography variant='h5'>
          <div style={style.div}>
            <Link
              underline='none'
              style={style.link}
              to='/signup'
              component={RouteLink}
            >
              Don't have an account? Sign up!
            </Link>
          </div>
        </Typography>
      </Paper>
    </div>
  );
}

export default Login;
