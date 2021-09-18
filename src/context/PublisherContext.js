import React, { useState, useEffect, createContext } from "react";
// util
import { customFetch } from "../util/customFetch";

export const PublisherContext = createContext();

export const PublisherProvider = (props) => {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    getPublishers();
  }, []);

  const getPublishers = async () => {
    const URL = "/api/publishers";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setPublishers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PublisherContext.Provider value={[publishers, setPublishers]}>
      {props.children}
    </PublisherContext.Provider>
  );
};
