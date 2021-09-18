import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useFindProductById = (productId) => {
  const [products, setProducts] = useContext(ProductContext);
  const index = products.findIndex((product) => product.id == productId);
  if (index === -1) {
    return null;
  }
  return products[index];
};

export default useFindProductById;
