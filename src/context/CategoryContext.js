import React, { createContext, useEffect, useState } from "react";
// util
import { customFetch } from "../util/customFetch";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const URL = "/api/categories";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider value={[categories, setCategories]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
