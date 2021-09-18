import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserSessionContext } from "../context/UserSessionContext";
const Address = ()=>{
    const { userSessionContextValue1, userSessionContextValue2 } = useContext(UserSessionContext);
    const [user, setUser] = userSessionContextValue1;
    console.log(user);
    const updateUserSessionContext = () =>{

    }
    return(
        <div className="my-profile">
            <div className="profile-header address">
                <h3>My address</h3>
                
            </div>
            <hr/>
            <div className="profile-form">
                <div className="item">
                    <div className="item-info">
                        <div className="name">{user.username}</div>
                        <div className="address">
                            <span>Address:</span>{user.address}
                        </div>
                        <div className="phone">
                            <span>Phone:</span>{user.phoneNumber}
                        </div>
                    </div>
                    <div className="item-action">
                        <Link to="/user/account/profile">Edit</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Address;