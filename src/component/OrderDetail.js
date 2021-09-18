import React from "react";
// custom-hooks
import useFindProductById from "../custom-hooks/useFindProductById";

const OrderDetail = (props) => {
  const { orderDetailProps } = props;

  const product = useFindProductById(orderDetailProps.productId);

  return (
    <div className="order_detail">
      <div>
        <img
          width="40"
          height="40"
          src={product === null ? "Loading..." : product.mainImage}
        ></img>
        <span className="product_title">
          {product === null ? "Loading..." : product.title}
        </span>
      </div>
      <span className="product_price">{`${
        product === null ? "Loading..." : product.price / 1000
      }.000 đ`}</span>
      <div className="quantity_wrapper">
        <span className="quantity">x {orderDetailProps.quantity}</span>
      </div>
    </div>
  );
};

export default OrderDetail;
