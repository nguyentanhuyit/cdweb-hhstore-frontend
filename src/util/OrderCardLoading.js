import React from "react";
import { Skeleton, Spin } from "antd";

const style = {
  width: "850px",
  height: "310px",
  padding: "1rem",
  display: "flex",
  columnGap: "2rem",
  //   justifyContent: "center",
  alignItems: "center",
};

const OrderCardLoading = () => {
  return (
    <div style={style}>
      <Spin size="large" />
      <Skeleton />
    </div>
  );
};

export default OrderCardLoading;
