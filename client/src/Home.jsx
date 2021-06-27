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
    text: {
      marginTop: '3rem',
      marginBottom: '1rem',
    },
  };
  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <Typography variant='h3' style={style.text}>
        Welcome to Jam Pack!
      </Typography>
    </Paper>
  );
}

export default Home;
