import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { UserSessionContext } from "../context/UserSessionContext";
//import util
import { customFetch } from "../util/customFetch";
//import react hook form
import { useForm } from "react-hook-form";
import { notification } from "antd";

//import react yup (validation)
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import notify

const openNotification = (placement) => {
  notification.success({
    message: "Update account!",
    description: "Update successful",
    placement,
  });
};

const User = () => {
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [user, setUser] = userSessionContextValue1;
  const [loginState, setLoginState] = userSessionContextValue2;
  const schema = yup.object().shape({
    userName: yup.string().min(8).required("Pleaser enter your email"),
    email: yup.string().email("Invalid").required("Pleaser enter your email"),
    phone: yup
      .number()
      .positive("Must be positive")
      .integer()
      .typeError("Must be Number"),
  });
  // handle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //reset các field của form
  useEffect(() => {
    reset({});
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const URL = `/api/users`;
      const body = JSON.stringify({
        id: user.id,
        username: data.userName,
        email: data.email,
        phoneNumber: data.phone,
        address: data.address,
        verified: user.verified,
        password: user.password,
      });
      const respond = await customFetch(URL, "PUT", body);
      if (respond.status === 200) {
        console.log("ok");
        openNotification("center");
      }
      setLoginState(Math.random());
    } catch (error) {
      console.log(error);
    }
  };
  //color error
  const style = {
    color: "red",
  };
  return (
    <div className="my-profile">
      {/* <div className="success"><i className="fa fa-check"></i>{success}</div> */}
      <div className="profile-header">
        <h3>My profile</h3>
        <p>Manage profile information for account security</p>
        <hr />
      </div>
      <div className="profile-form">
        <div className="profile-form-info">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 row">
              <label
                htmlFor="userName"
                className="col-sm-3 col-form-label obligate"
              >
                Username:
              </label>
              <div className="col-sm-9">
                <input
                  {...register("userName")}
                  type="text"
                  className="form-control"
                  id="userName"
                  defaultValue={user?.username}
                />
                <p style={style}>{errors.userName?.message}</p>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="email"
                className="col-sm-3 col-form-label obligate"
              >
                Email:
              </label>
              <div className="col-sm-9">
                <input
                  {...register("email")}
                  type="text"
                  className="form-control"
                  id="email"
                  defaultValue={user?.email}
                />
                <p style={style}>{errors.email?.message}</p>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="phone"
                className="col-sm-3 col-form-label obligate"
              >
                Phone Number:
              </label>
              <div className="col-sm-9">
                <input
                  {...register("phone")}
                  type="text"
                  className="form-control"
                  id="phone"
                  defaultValue={user?.phoneNumber}
                />
                <p style={style}>{errors.phone?.message}</p>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="address"
                className="col-sm-3 col-form-label obligate"
              >
                Address:
              </label>
              <div className="col-sm-9">
                <input
                  {...register("address")}
                  type="text"
                  className="form-control"
                  id="address"
                  defaultValue={user?.address}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default User;
