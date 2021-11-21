import { atom } from 'recoil';
console.log('d', localStorage.getItem('user') != 'undefined');
const authAtom = atom({
  key: 'auth',
  default:
    localStorage.getItem('user') != 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null,
});

export { authAtom };
