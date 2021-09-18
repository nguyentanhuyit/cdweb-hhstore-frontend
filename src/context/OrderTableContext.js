import React, { useState, useEffect, createContext, useContext } from "react";
// context
import { UserSessionContext } from "./UserSessionContext";
// util
import useDidMountEffect from "../component/useDidMountEffect";
import { customFetchAuth } from "../util/customFetch";

export const OrderTableContext = createContext();

export const OrderTableProvider = (props) => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;

  // initialize
  const [orderTables, setOrderTables] = useState([]);
  const [eventClickOrderTable, setEventClickOrderTable] = useState(0);

  const getOrderTables = async () => {
    const URL = `/api/ordertablelist/${userSession.id}`;
    try {
      if (userSession.loggedin !== false) {
        const response = await customFetchAuth(URL, "GET", null, {
          username: userSession.username,
          password: userSession.password,
        });
        if (!response.ok) {
          throw new Error("Problem get order table");
        }
        const data = await response.json();
        setOrderTables(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useDidMountEffect(getOrderTables, [userSession, eventClickOrderTable]);

  return (
    <OrderTableContext.Provider
      value={{
        orderTableContextValue1: [orderTables, setOrderTables],
        orderTableContextValue2: [
          eventClickOrderTable,
          setEventClickOrderTable,
        ],
      }}
    >
      {props.children}
    </OrderTableContext.Provider>
  );
};
