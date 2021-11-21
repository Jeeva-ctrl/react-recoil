import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../state';

export { Nav };

function Nav() {
  const auth = useRecoilValue(authAtom);
  if (!auth) return null;

  return <nav></nav>;
}
