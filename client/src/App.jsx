import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Profile from './Profile';
import Pack from './Pack';
function App() {
  const user = useSelector((state) => state.user);
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
          {user.id && (
            <>
              <Route path='/account'>
                <Profile />
              </Route>
              <Route path='/pack'>
                <Pack />
              </Route>
            </>
          )}
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
