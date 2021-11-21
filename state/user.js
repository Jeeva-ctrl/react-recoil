import { atom } from 'recoil';

const usersAtom = atom({
  key: 'users',
  default: [],
});

const userAtom = atom({
  key: 'user',
  default: null,
});

export { usersAtom, userAtom };
