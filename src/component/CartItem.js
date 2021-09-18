import React, { useContext } from "react";
// context
import { CartContext } from "../context/CartContext";
// util
import { customFetchAuth } from "../util/customFetch";
// design
import "antd/dist/antd.css";
import { Tooltip } from "antd";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
// custom-functions
import { updateCartItemQuantity } from "../custom-functions";
// custom-hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";
import useFindProductById from "../custom-hooks/useFindProductById";
import useGetAuthorName from "../custom-hooks/useGetAuthorName";

const CartItem = (props) => {
  const { cartItemProps } = props;
  //
  const userSession = useUserSessionContext();
  // update cart
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [triggerCartContext, setTriggerCartContext] = cartContextValue2;

  const product = useFindProductById(cartItemProps.product);
  const authorName = useGetAuthorName(cartItemProps.product);

  // handle update quantity ++++++++++++++++++++++
  const handleUpdateCartItemQuantity = async (actionType) => {
    console.log("reduce", cartItemProps);
    const response = await updateCartItemQuantity(cartItemProps, actionType, {
      username: userSession.username,
      password: userSession.password,
    });
    if (response === "ok") {
      setTriggerCartContext(Math.random());
    }
  };

  // delete cart-item ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const deleteCartItem = async () => {
    const URL = `/api/cartitems/${cartItemProps.id}`;
    try {
      const response = await customFetchAuth(URL, "DELETE", null, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      setTriggerCartContext(Math.random());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart_item">
      <div className="product_image">
        <img
          alt="..."
          className="product_image"
          width="80"
          height="80"
          src={product === null ? "Loading..." : product.mainImage}
        ></img>
        <div className="product_title">
          <span className="text1">
            {product === null ? "Loading..." : product.title}
          </span>
          <span className="text2">{authorName}</span>
        </div>
      </div>
      <div className="product_price">
        <span>{`${
          product === null ? "Loading..." : product.price / 1000
        }.000 đ`}</span>
      </div>
      <div className="update_quantity">
        <Tooltip title="-1">
          <button onClick={() => handleUpdateCartItemQuantity("reduce")}>
            <BiMinus />
          </button>
        </Tooltip>
        <div className="quantity">
          <span>{cartItemProps.quantity}</span>
        </div>
        <Tooltip title="+1">
          <button onClick={() => handleUpdateCartItemQuantity("add")}>
            <BiPlus />
          </button>
        </Tooltip>
      </div>
      <div className="delete">
        <Tooltip title="Delete">
          <button onClick={deleteCartItem}>
            <MdDeleteForever style={{ color: "#FF4D4F" }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CartItem;
