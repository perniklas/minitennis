import React, { useState } from 'react';
import { logInWithEmailAndPassword, logOutUser } from '../helpers/firebase';

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null
}

export const AuthContext = React.createContext(initialState);

export const AuthContextProvider = props => {
  const [state, setState] = useState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    logOutUser();
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = async (email, password, callback) => {
  await logInWithEmailAndPassword(email, password);

  if (callback)
    callback();
};