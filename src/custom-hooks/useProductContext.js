import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProductContext = () => {
  const [products, setProducts] = useContext(ProductContext);
  return products;
};

export default useProductContext;
