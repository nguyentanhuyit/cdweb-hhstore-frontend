import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// util
import { customFetch } from "../util/customFetch";
// component
import CartItem from "./CartItem";
import NavigateLink from "./NavigateLink";
// design
import "antd/dist/antd.css";
import { notification } from "antd";
import { MdBorderColor } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
// custom-hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";
import useCartContext from "../custom-hooks/useCartContext";

const openNotification = (placement) => {
  notification.success({
    message: "Shopping bag is empty!",
    description: "Please add more products",
    placement,
  });
};

const Cart = () => {
  const history = useHistory();
  const userSession = useUserSessionContext();
  const cartItems = useCartContext();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  const getTotalPrice = async () => {
    if (userSession.loggedin !== false) {
      try {
        const URL = `/api/cartitems/totalprice/userid/${userSession.id}`;
        const response = await customFetch(URL, "GET");
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setTotalPrice(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pushToOrderProcess = () => {
    if (cartItems.length === 0) {
      openNotification("bottomRight");
    } else {
      history.push({
        pathname: "/orderprocess",
        state: {
          totalPrice: totalPrice,
        },
      });
    }
  };

  return (
    <div className="cart_wrapper">
      <div className="cart_wrapper_header">
        <NavigateLink link1={"cart"} />
        <span className="cart_wrapper_title">
          <IoMdCart style={{ fontSize: "1.8rem" }} /> Shopping Cart
        </span>
      </div>
      <div className="cart_wrapper_body">
        <div className="cart">
          <div className="cart_header">
            <div className="text">Product ({cartItems.length} products)</div>
            <div className="text">Price</div>
            <div className="text">Quantity</div>
            <div className="text">Delete</div>
          </div>
          <div className="cart_body">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItemProps={cartItem} />
            ))}
          </div>
        </div>
        {/* discount and order */}
        <div className="discount_and_order">
          <div className="discount_and_order_header">
            <span>Order Summary</span>
          </div>
          <div className="discount_form">
            <span className="normal_text">Discount code</span>
            <form>
              <input placeholder="Enter the discount code"></input>
              <button onClick={(e) => e.preventDefault()}>Apply</button>
            </form>
          </div>
          <div className="total_price">
            <span className="normal_text">Total price</span>
            <span className="normal_text">{`${totalPrice / 1000}.000 đ`}</span>
          </div>
          <div className="after_discount">
            <span className="normal_text">After discount</span>
            <span className="normal_text">- 0%</span>
          </div>
          <div className="total">
            <span className="big_text">Total</span>
            <span className="number">{`${(totalPrice * 1) / 1000}.000 đ`}</span>
          </div>
          <button className="btn_checkout" onClick={() => pushToOrderProcess()}>
            <MdBorderColor />
            <span>Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
