import React from "react";
// custom-hooks
import useFindProductById from "../custom-hooks/useFindProductById";

const OrderItem = (props) => {
  const { cartItemProps } = props;

  const product = useFindProductById(cartItemProps.product);

  return (
    <div className="order_item">
      <div>
        <img
          width="50"
          height="50"
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
        <span className="quantity">x {cartItemProps.quantity}</span>
      </div>
    </div>
  );
};

export default OrderItem;
