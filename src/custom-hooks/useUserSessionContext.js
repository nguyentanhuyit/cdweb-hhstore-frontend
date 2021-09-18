import React, { useContext } from "react";
import { UserSessionContext } from "../context/UserSessionContext";

const useUserSessionContext = () => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  return userSession;
};

export default useUserSessionContext;
