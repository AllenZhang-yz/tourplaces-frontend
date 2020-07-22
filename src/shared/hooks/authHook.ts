import { useState, useCallback, useEffect } from 'react';

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [tokenExpDate, setTokenExpDate] = useState<Date>();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const login = useCallback(
    (uid: string, token: string, uName: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);
      setUserName(uName);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token,
          userName: uName,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );
  const logout = useCallback(() => {
    setToken('');
    setTokenExpDate(undefined);
    setUserId('');
    setUserName('');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    let storedDataObj;
    if (storedData) {
      storedDataObj = JSON.parse(storedData);
    }
    if (
      storedDataObj &&
      storedDataObj.token &&
      storedDataObj.userId &&
      storedDataObj.userName &&
      new Date(storedDataObj.expiration) > new Date()
    ) {
      login(
        storedDataObj.userId,
        storedDataObj.token,
        storedDataObj.userName,
        new Date(storedDataObj.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, userName };
};
