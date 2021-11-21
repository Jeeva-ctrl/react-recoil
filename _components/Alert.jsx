import React from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { alertAtom } from '../state';
import { history } from '../_helpers';
import { useAlertActions } from '../_actions';

export { Alert };

function Alert() {
  const alert = useRecoilValue(alertAtom);
  const alertActions = useAlertActions();

  useEffect(() => {
    const unlisten = history.listen(alertActions.clear);
    return unlisten;
  });
  if (!alert) return null;

  return (
    <div className="container">
      <div className="m-3">
        <div className={`alert alert-dismissable ${alert.type}`}>
          <a className="close" onClick={alertActions.clear}>
            &times;
          </a>
          {alert.message}
        </div>
      </div>
    </div>
  );
}
