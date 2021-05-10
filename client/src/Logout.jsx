import React from 'react';
import { Paper, Typography } from '@material-ui/core';
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
};
function Logout() {
  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <Typography>
        <h2>Goodbye</h2>
      </Typography>
    </Paper>
  );
}

export default Logout;
