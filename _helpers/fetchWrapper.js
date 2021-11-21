import { useRecoilState } from 'recoil';
import { history } from '../_helpers';
import { authAtom } from '../state';
export { useFetchWrapper };
function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);
  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };
  function request(method) {
    return (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }
  function handleResponse(res) {
    console.log('data', res);
    return res.text().then((text) => {
      const data = text && JSON.parse(text);
      console.log('data', data);
      if (!res.ok) {
        console.log('res.status', res.status);
        if ([401, 403].includes(res.status) && auth?.token) {
          localStorage.removeItem('user');
          setAuth(null);
          history.push('/account/login');
        }
        const error = (data && data.message) || res.statusText;
        return Promise.reject(error);
      }
    });
  }
  function authHeader(url) {
    return {};
  }
}
