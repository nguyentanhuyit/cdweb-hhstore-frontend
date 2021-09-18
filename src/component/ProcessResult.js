import React from "react";
import { Result } from "antd";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";

const linkStyle1 = {
  textDecoration: "none",
  color: "white",
};

const linkStyle2 = {
  textDecoration: "none",
  color: "#0d6efd",
};

const ProcessResult = () => {
  return (
    <div className="process_result">
      <Result
        icon={<FcOk style={{ fontSize: "10rem" }} />}
        status="success"
        title="Ordered Successfully!"
        subTitle="Keep buying more from H&H Store!"
      />
      <div className="group_button">
        <button className="btn1">
          <Link to="/ordertablelist" style={linkStyle1}>
            View Orders
          </Link>
        </button>
        <button className="normal_btn btn2">
          <Link to="/" style={linkStyle2}>
            By Again
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProcessResult;
