import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './store/actions/user/logout';
import { useHistory } from 'react-router';

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
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(logoutUser());
    }
    setTimeout(() => history.push('/'), 1000);
  });
  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <Typography variant='h3' style={style.text}>
        Goodbye
      </Typography>
    </Paper>
  );
}

export default Logout;
