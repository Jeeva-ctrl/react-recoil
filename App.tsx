import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from './state';
import { Nav, PrivateRoute, Alert } from './_components';
import { history, useFakeBackEnd } from './_helpers';
import { Account } from './account';

export { App };

function App() {
  useFakeBackEnd();
  const auth = useRecoilValue(authAtom);

  return (
    <div className={'app-container' + (auth ? ' bg-light' : '')}>
      <Router history={history}>
        <Nav />
        <Alert />
        <Switch>
           <PrivateRoute exact path="/" component={Nav} />
          <PrivateRoute path="/users" component={Nav} /> 
          <Route path="/account" component={Account} />
   
        </Switch>
      </Router>
    </div>
  );
}
