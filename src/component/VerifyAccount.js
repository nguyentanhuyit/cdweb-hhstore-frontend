import React, { useState, useContext } from "react";
// util
import useDidMountEffect from "./useDidMountEffect";
import { customFetch, customFetchAuth } from "../util/customFetch";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { UserContext } from "../context/UserContext";
// design
import { CheckCircleTwoTone } from "@ant-design/icons";
import { notification } from "antd";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// mail
import { init, send } from "emailjs-com";
init("user_tIAOd6b6gOsVgoXljD3FZ");

const schema = yup.object().shape({
  verifyCode: yup.string().required(),
});

// css
const mesStyleErr = {
  color: "#ff4d58",
};
const mesStyleFoc = {
  color: "#017FFF",
};
const inpStyleErr = {
  border: "0.5px solid #ff4d58",
  boxShadow: "0 0 0 5px #F8D7DA",
};
const inpStyleFoc = {
  border: "0.5px solid #017fff",
  boxShadow: "0 0 0 5px #bfdeff",
};

const openNotification = (placement) => {
  notification.success({
    message: "Message has been send!",
    description:
      "We sent a verify code to your email (less than 3 minutes), please check your email!",
    placement,
  });
};

const VerifyAccount = () => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;

  console.log("hhahaha", userSession.username, userSession.password);
  // * CHECK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // initialize error message state
  const [errorMessage, setErrorMessage] = useState(
    userSession.verified === 1 ? "Account is verified!" : ""
  );

  // get verify code method
  const [randomCode, setRandomCode] = useState(0);

  const getVerifyCode = () => {
    // e.preventDefault();
    const ranNumber = Math.floor(1000 + Math.random() * 9000);
    sendMail(userSession.username, userSession.email, ranNumber);
    openNotification("bottomRight");
    setRandomCode(ranNumber);
  };

  // send mail
  const sendMail = (name, email, code) => {
    send(
      "service_s4bg5fg",
      "template_93cmalq",
      {
        to_name: `${name}`,
        message: `${code}`,
        to_email: `${email}`,
      },
      "user_tIAOd6b6gOsVgoXljD3FZ"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const submitFormVerify = (e) => {
    if (e.verifyCode == randomCode) {
      verifyAction();
    } else {
      setErrorMessage("Code does not match! Try again!");
    }
  };

  // * verify action ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const verifyAction = async () => {
    const URL = `/api/account/verify/${userSession.id}`;
    try {
      const response = await customFetchAuth(URL, "PUT", null, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) {
        setErrorMessage("Network or server problem!");
        throw new Error("Problem verify");
      }
      setErrorMessage("Verify account successfully!");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main_form_page verifyaccount">
      <form className="main_form" onSubmit={handleSubmit(submitFormVerify)}>
        <div className="main_form_header">
          <span className="title">Verify Account</span>
        </div>
        <span
          className="error_message main_message"
          style={{ color: "#49AA19" }}
        >
          {errorMessage}{" "}
          {userSession.verified === 1 ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          ) : (
            ""
          )}
        </span>
        <div className="body">
          <div className="input_group">
            <label className="error_message" style={mesStyleFoc}>
              Your email
            </label>
            <input
              name="email"
              value={userSession.email}
              className="input_form"
              disabled
            />
            <button
              type="button"
              onClick={getVerifyCode}
              className="send_verify_code"
            >
              Get verify code
            </button>
          </div>

          <div className="input_group">
            <label
              className="error_message"
              style={errors.verifyCode ? mesStyleErr : mesStyleFoc}
            >
              {errors.verifyCode ? errors.verifyCode.message : "* Verify code"}
            </label>
            <input
              name="verifyCode"
              className="input_form"
              style={errors.verifyCode ? inpStyleErr : inpStyleFoc}
              {...register("verifyCode")}
            />
          </div>

          <button className="btn_form" type="submit">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyAccount;
