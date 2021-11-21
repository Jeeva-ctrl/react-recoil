import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from './state';
import { Nav, PrivateRoute } from './_components';
import { history,useFakeBackEnd } from './_helpers';
import { Account } from './account';


export { App };

function App() {
  useFakeBackEnd();
  const auth = useRecoilValue(authAtom);

  return (
    <div className={'app-container' + (auth ? ' bg-light' : '')}>
      <Router history={history}>
        <Nav />
        <Switch>
          <PrivateRoute exact path="/" component={Nav} />
          <PrivateRoute path="/users" component={Nav} />
          <Route path="/account" component={Account} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}
