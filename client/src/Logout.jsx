import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logoutUser } from './store/actions/user/logout';

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
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    marginTop: '3rem',
    marginBottom: '1rem',
  },
};
function Logout() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(logoutUser()));
  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <Typography variant='h3' style={style.text}>
        Goodbye
      </Typography>
    </Paper>
  );
}

export default Logout;
