import React from "react";
import { Skeleton, Spin } from "antd";

const style = {
  width: "216px",
  height: "380px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
  //   justifyContent: "center",
  alignItems: "center",
};

const ProductCardLoading = () => {
  return (
    <div style={style}>
      <Spin size="large" />
      <Skeleton />
    </div>
  );
};

export default ProductCardLoading;
