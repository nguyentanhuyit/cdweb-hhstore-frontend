import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { FaLeaf } from "react-icons/fa";

const font = {
  color: "white",
  fontSize: "5rem",
};

const Loading = () => {
  return (
    <div className="loading">
      <FaLeaf style={font} />
      <p>Loading ...</p>
    </div>
  );
};

export default Loading;
