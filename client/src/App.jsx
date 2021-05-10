import React from 'react';
import Nav from './Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path='/login'>
          <h2>Login page</h2>
        </Route>
        <Route path='/signup'>
          <h2>Signup page</h2>
        </Route>
        <Route path='/logout'>
          <h2>Logout page</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
