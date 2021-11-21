export { useFakeBackEnd };

const localStorageKey = 'recoil-user-key-!@#0';
let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

function useFakeBackEnd() {
  const realFetch = window.fetch;

  window.fetch = (url, options) => {
    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);
      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate'):
            return authenticate(options);
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

      function authenticate(options) {
        const { username, password } = JSON.parse(options.body);
        const user =
          users &&
          users.find((x) => x.username == username && x.password == password);
        if (!user) {
          return error('Invalid username or password');
        }
        return ok({
          token: 'fake-token',
        });
      }

      function register(options) {
        const user = body(options);

        if (users && users.find((x) => x.username == user.username)) {
          return error('User name "' + user.username + '" is already taken');
        }
        user.id =
          users && users.length ? Math.max(...(users.map((x) => x.id) + 1)) : 1;
        users.push(user);
        localStorage.setItem(localStorageKey, JSON.stringify(users));
        ok({ message: 'Registration success' });
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
