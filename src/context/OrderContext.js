import React, { createContext, useEffect, useState } from "react";
// util
import { customFetch } from "../util/customFetch";

export const OrderContext = createContext();

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const URL = "/api/ordertables";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider value={[orders, setOrders]}>
      {props.children}
    </OrderContext.Provider>
  );
};
