import React, { useState, useContext } from "react";
// router dom
import { Link, useHistory } from "react-router-dom";
// util
import { customFetch } from "../util/customFetch";
// context
import { UserSessionContext } from "../context/UserSessionContext";
//
import { FaLeaf } from "react-icons/fa";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
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

// util save user-session into local storage method
const saveUserSessionIntoLocalStorage = (s) => {
  try {
    localStorage.clear();
    localStorage.setItem("userSessionBookShop", JSON.stringify(s));
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  const history = useHistory();
  // get user-session-context to use login-state
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [loginState, setLoginState] = userSessionContextValue2;

  // * CHECK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // initialize error message state
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitLogin = (e) => {
    loginAction(e);
  };

  // * login action ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const loginAction = async (loginInput) => {
    const URL = "/api/login";
    const bodyContent = JSON.stringify({
      username: `${loginInput.username}`,
      password: `${loginInput.password}`,
    });

    try {
      const response = await customFetch(URL, "POST", bodyContent);
      if (response.status === 404) {
        setErrorMessage("Wrong username or password! Try again.");
        throw new Error("Problem get user");
      }
      if (response.status === 500) {
        setErrorMessage(
          "Please check your Network connection! or maybe our Server have problem!"
        );
        throw new Error("Problem get user");
      }
      const data = await response.json();
      data.password = loginInput.password;
      saveUserSessionIntoLocalStorage(data);
      // rerender user-session
      setLoginState(Math.random());
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main_form_page">
      <form className="main_form" onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="main_form_header">
          <FaLeaf style={{ fontSize: "2rem" }} />
          <span className="title">Welcome to Bookstore!</span>
        </div>
        <span className="error_message main_message" style={mesStyleErr}>
          {errorMessage}
        </span>
        <div className="body">
          <div className="input_group">
            <label
              className="error_message"
              style={errors.username ? mesStyleErr : mesStyleFoc}
            >
              {errors.username ? "Please enter your username!" : "Username"}
            </label>
            <input
              name="username"
              className="input_form"
              style={errors.username ? inpStyleErr : inpStyleFoc}
              {...register("username")}
            />
          </div>
          <div className="input_group">
            <label
              className="error_message"
              style={errors.password ? mesStyleErr : mesStyleFoc}
            >
              {errors.password ? "Please enter your password" : "Password"}
            </label>
            <input
              name="password"
              className="input_form"
              style={errors.password ? inpStyleErr : inpStyleFoc}
              type="password"
              {...register("password")}
            />
          </div>
          <button className="btn_form" type="submit">
            Login
          </button>
        </div>
        <div className="sub">
          <Link to="/login">Forgot password?</Link>
          <Link to="/signup">Create new account!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
