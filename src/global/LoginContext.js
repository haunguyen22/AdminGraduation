import React, {createContext, useReducer} from 'react';
import { LoginReducer } from './LoginReducer';
export const LoginContext = createContext();

export const LoginContextProvider = props => {
  const [login, dispatchSignedIn] = useReducer(LoginReducer, {
    user: null,
  });

  return (
    <LoginContext.Provider value={{login, dispatchSignedIn}}>
      {props.children}
    </LoginContext.Provider>
  );
};
