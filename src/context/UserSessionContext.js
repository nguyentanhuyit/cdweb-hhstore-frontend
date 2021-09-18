import React, { useState, createContext, useEffect } from "react";

export const UserSessionContext = createContext();

export const UserSessionProvider = (props) => {
  // initialize user-session state
  const [userSession, setUserSession] = useState({
    loggedin: false,
    username: "none",
    password: "none",
    role: 0
  });
  // listen to login action
  const [loginState, setLoginState] = useState(0);

  // * get user-session at the first time & when login-state change
  useEffect(() => {
    getUserSession();
  }, [loginState]);

  const getUserSession = () => {
    try {
      // 1. get user-session OBJECT from local storage
      const userSessionLocalStorage = JSON.parse(
        localStorage.getItem("userSessionBookShop")
      );
      // 2. set new user-session state if OBJECT is available
      if (userSessionLocalStorage !== null) {
        setUserSession(userSessionLocalStorage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserSessionContext.Provider
      value={{
        userSessionContextValue1: [userSession, setUserSession],
        userSessionContextValue2: [loginState, setLoginState],
      }}
    >
      {props.children}
    </UserSessionContext.Provider>
  );
};
