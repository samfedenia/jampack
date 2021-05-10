import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
