import { useContext } from "react";
//
import { ProductContext } from "../context/ProductContext";

const GetSingleProductById = (productId) => {
  const [products, setProducts] = useContext(ProductContext);
  const getProduct = products.filter((p) => {
    return p.id === productId;
  });
  return getProduct[0];
};

// const GetSingleProductById = async (productId) => {
//   const url = `/products/${productId}`
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

export default GetSingleProductById;
