import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
function Login() {
  return (
    <div>
      <h2>Login</h2>
      <Typography variant='h5'>
        <Link
          underline='none'
          // style={style.link}
          // color={primary}
          to='/signup'
          component={RouteLink}
        >
          Signup
        </Link>
      </Typography>
    </div>
  );
}

export default Login;
