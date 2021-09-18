import React, { useState, useEffect, createContext } from "react";
// util
import { customFetch } from "../util/customFetch";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = "/api/products";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};
