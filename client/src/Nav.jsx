import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Grid, Link, Typography } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    flexDirection: 'column',
  },
};

function Nav() {
  return (
    <Grid style={style.grid} container>
      <Typography variant='h5'>
        <Link
          underline='none'
          style={style.link}
          color={primary}
          to='/'
          component={RouteLink}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <HomeIcon style={style.icon} />
            Home
          </div>
        </Link>
      </Typography>

      <Typography variant='h5'>
        <Link
          underline='none'
          style={style.link}
          color={primary}
          to='/login'
          component={RouteLink}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon style={style.icon} />
            Login/Signup
          </div>
        </Link>
      </Typography>
      {/* <Typography variant='h5'>
        <Link style={style.link} component={RouteLink} to='/signup'>
          Signup
        </Link>
      </Typography> */}
      <Typography variant='h5'>
        <Link
          underline='none'
          style={style.link}
          component={RouteLink}
          to='/logout'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ExitToAppIcon style={style.icon} />
            Logout
          </div>
        </Link>
      </Typography>
    </Grid>
  );
}

export default Nav;
