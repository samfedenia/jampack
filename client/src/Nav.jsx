import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Grid, Link, Typography } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import HomeIcon from '@material-ui/icons/Home';

const primary = lightGreen[200];
const secondary = lightGreen[800];
const style = {
  grid: {
    backgroundColor: primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    height: '8rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: secondary,
  },
  icon: {
    width: 60,
    height: 60,
  },
};

function Nav() {
  return (
    <Grid style={style.grid} container>
      <Link style={style.link} color={primary} to='/' component={RouteLink}>
        <HomeIcon style={style.icon} />
      </Link>

      <Typography variant='h5'>
        <Link
          style={style.link}
          color={primary}
          to='/login'
          component={RouteLink}
        >
          Login
        </Link>
      </Typography>
      <Typography variant='h5'>
        <Link style={style.link} component={RouteLink} to='/signup'>
          Signup
        </Link>
      </Typography>
      <Typography variant='h5'>
        <Link style={style.link} component={RouteLink} to='/logout'>
          Logout
        </Link>
      </Typography>
    </Grid>
  );
}

export default Nav;
