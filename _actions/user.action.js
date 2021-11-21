import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers';
export { useUserActions };

function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const fetchWrapper = useFetchWrapper();
  return {
    login,
  };

  function login({ username, password }) {
    fetchWrapper
      .post(`${baseUrl}/authenticate`, { username, password })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((err) => console.error(err));
    console.log('user login action triggered');
  }
}
