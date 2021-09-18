import React, { useState, useEffect, createContext } from "react";
// util
import { customFetchAuth } from "../util/customFetch";
// custom-hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";

export const CartContext = createContext();
export const CartProvider = (props) => {
  const userSession = useUserSessionContext();
  // initialize
  const [cartItems, setCartItems] = useState([]);
  const [triggerCartContext, setTriggerCartContext] = useState(0);

  useEffect(() => {
    getCartItems();
  }, [userSession, triggerCartContext]);

  const getCartItems = async () => {
    if (userSession.loggedin !== false) {
      try {
        const URL = `/api/cart/${userSession.id}`;
        const response = await customFetchAuth(URL, "GET", null, {
          username: userSession.username,
          password: userSession.password,
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartContextValue1: [cartItems, setCartItems],
        cartContextValue2: [triggerCartContext, setTriggerCartContext],
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
