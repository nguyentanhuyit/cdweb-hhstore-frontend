import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiUser } from "react-icons/fi";
import avatar_default from "../img/avatar_default.jpg";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { UserSessionContext } from "../context/UserSessionContext";
const Menubar = () => {
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  const userName = userSession.username;
  return (
    <div className="user_menu_bar">
      <div className="profile">
        <div className="icon_wrap">
          <FiUser />
        </div>
        <div className="profile-name">{userName}</div>
      </div>
      <ul class="profile-menu">
        <li>
          <Link to="/user/account/profile">Profile detail</Link>
        </li>
        <li>
          <Link to="/user/account/changePassword">Change password</Link>
        </li>
        <li>
          <Link to="/user/account/address">Change address</Link>
        </li>
      </ul>
      {/* <li><i className="fa fa-shopping-bag"></i> &ensp;<Link to="profile.html">My order</Link></li> */}
    </div>
  );
};

export default Menubar;
