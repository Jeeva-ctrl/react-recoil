import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from './state';
import { history } from './_helpers';
import { Nav } from './_components';

const App = () => {
  const auth = useRecoilValue(authAtom);
  return (
    <div className={'app-container' + auth ? 'bg-light' : ''}>
      <Router history={history}>
        <Nav />
      </Router>
    </div>
  );
};
export { App };
