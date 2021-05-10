import React from 'react';
import { Paper, Typography } from '@material-ui/core';
function Home() {
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
  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <Typography>
        <h2>Welcome to PackPlanner!</h2>
      </Typography>
    </Paper>
  );
}

export default Home;
