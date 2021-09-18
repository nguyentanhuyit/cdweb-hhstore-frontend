import React, { useEffect, useState } from "react";
// component
import ProductCard from "./ProductCard";
// lazyload
import { useLocation, useHistory } from "react-router-dom";
import { customFetch } from "../util/customFetch";
//
import { Pagination } from "antd";

const ProductList = () => {
  // MAIN FILTER
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const history = useHistory();

  const [productList, setProductList] = useState({
    content: [],
    totalElements: 0,
  });

  useEffect(() => {
    getProductList();
  }, [location.search]);

  const getProductList = async () => {
    const URL = `/api${location.pathname}${location.search}`;
    try {
      const response = await customFetch(URL, "GET");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log("productlist data", data);
      setProductList(data);
    } catch (error) {
      console.log(error);
    }
  };

  // page
  const onchangePage = (e) => {
    console.log(e);
    params.set("page", e - 1);
    if (e == 1) {
      params.delete("page");
    }
    history.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="product_list_wrapper">
      <div className="product_list">
        {productList.content.map((product) => (
          <ProductCard key={product.id} productProps={product} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          onChange={onchangePage}
          defaultCurrent={1}
          total={productList.totalElements}
        />
      </div>
    </div>
  );
};

export default ProductList;
