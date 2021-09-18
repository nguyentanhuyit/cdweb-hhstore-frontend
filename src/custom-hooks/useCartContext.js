import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCartContext = () => {
  // get all cart item
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  return cartItems;
};

export default useCartContext;
