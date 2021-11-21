import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './';
export { useUserActions };

function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const fetchWrapper = useFetchWrapper();
  const actions = useAlertActions();
  return {
    login,
    register,
  };

  function login({ username, password }) {
    fetchWrapper
      .post(`${baseUrl}/authenticate`, { username, password })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((err) => actions.error(err));
    console.log('user login action triggered');
  }

  function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
  }
}
