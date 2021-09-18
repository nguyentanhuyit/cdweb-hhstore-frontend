import React from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  return (
    <div className="not_found">
      <Result status="403" title="PAGE NOT FOUND" />
    </div>
  );
};

export default NotFound;
