import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserSessionContext } from "../context/UserSessionContext";
//import util
import { customFetch } from "../util/customFetch";
//import react hook form
import { useForm } from "react-hook-form";
//import react yup (validation)
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//import notify
import { notification } from "antd";

const openNotification = (placement) => {
    notification.success({
      message: "Update password!",
      description: "Update password successful",
      placement,
    });
  };
const ChangePassword = () =>{
    const { userSessionContextValue1, userSessionContextValue2 } = useContext(UserSessionContext);
    const [user, setUser] = userSessionContextValue1;
    const schema = yup.object().shape({
        currentPass: yup.string().oneOf([user.password, null], 'Password is swrong').required(),
        newPass: yup.string().min(4).required(),
        confirmNewPass:yup.string().oneOf([yup.ref('newPass'), null], 'Password must match')
    });
        // handle
        const { register, handleSubmit, formState:{ errors}, reset } = useForm({
            resolver: yupResolver(schema),
        });
        
        //reset các field của form
        useEffect(() => {
              reset({ });
          }, [user]);

    const onSubmit = async (data)=>{
        try {
            const URL = `/api/users`;
            const body = JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phone,
            address: user.addres,
            verified: user.verified,
            password: data.newPass
        });
        const respond = await customFetch(URL, "PUT", body);
        if(respond.status===200){
            console.log("ok");
            openNotification("center");
        }
        } catch (error) {
            console.log(error);
        }
        
    }
 //color error
    const style = {
        color:"red"
    }
    return(
        <div className="my-profile">
            <div className="profile-header">
                <h3>Update password</h3>
                <p>For account security, please do not share your password with others</p>
                <hr/>
            </div>
            <div className="profile-form">
                <div className="profile-form-info">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3 row">
                            <label htmlFor="currentPass" className="col-sm-3 col-form-label obligate">Current password:</label>
                            <div className="col-sm-9">
                                <input {...register("currentPass")} type="password" className="form-control" id="currentPass" />
                                <p style={style}>{errors.currentPass?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="newPass" className="col-sm-3 col-form-label obligate">New password:</label>
                            <div className="col-sm-9">
                                <input {...register("newPass")} type="password" className="form-control" id="newPass"/>
                                <p style={style}>{errors.newPass?.message}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="confirmNewPass" className="col-sm-3 col-form-label obligate">Confirm new pass:</label>
                            <div className="col-sm-9">
                                <input {...register("confirmNewPass")} type="password" className="form-control" id="confirmNewPass"/>
                                <p style={style}>{errors.confirmNewPass?.message}</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
                        
            </div>
        </div>
    );
};
export default ChangePassword;