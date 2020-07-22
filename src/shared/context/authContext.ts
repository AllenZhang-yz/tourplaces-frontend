import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  userName: '',
  token: '',
  login: (
    uid: string,
    token: string,
    userName: string,
    expirationDate?: Date
  ) => {},
  logout: () => {},
});
