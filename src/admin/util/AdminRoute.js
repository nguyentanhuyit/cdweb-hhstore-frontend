import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserSessionContext } from "../../context/UserSessionContext";
import NotFound from "../../util/NotFound";

const AdminRoute = (props) => {
  const { path, component } = props;

  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;

  if (userSession.loggedin === false) {
    return <Redirect from={path} to="/login"></Redirect>;
  } else if (!userSession.roles.includes(1)) {
    return <Route component={NotFound}></Route>;
  }

  return <Route path={path} component={component}></Route>;
};

export default AdminRoute;
