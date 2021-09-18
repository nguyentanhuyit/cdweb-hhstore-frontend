import React, { useState, useEffect, createContext } from "react";
// util
import { customFetch } from "../util/customFetch";

export const AuthorContext = createContext();

export const AuthorProvider = (props) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = async () => {
    const URL = "/api/authors";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthorContext.Provider value={[authors, setAuthors]}>
      {props.children}
    </AuthorContext.Provider>
  );
};
