export { useFakeBackEnd };

const localStorageKey = 'recoil-user-key-!@#0';
const users = JSON.parse(localStorage.getItem(localStorageKey));

function useFakeBackEnd() {
  const realFetch = window.fetch;

  window.fetch = (url, options) => {
    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);
      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate'):
            return authenticate();
            break;

          case url.endsWith('/users/register'):
            return register(options);
            break;
          default:
            return realFetch(url, options)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
        }
      }

      function authenticate() {
        return ok({
          token: 'fake-token',
        });
      }

      function register(options) {
        const user = body(options);

        if (users.find((x) => x.username == user.username)) {
          return error('User name "' + x.username + '" is already taken');
        }
        user.id = users.length ? Math.max(...(users.map((x) => x.id) + 1)) : 1;
        users.push(user);
        localStorage.setItem(localStorageKey, users);
      }

      function body(options) {
        return options.body && JSON.parse(options.body);
      }

      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function error(message) {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }
    });
  };
}
