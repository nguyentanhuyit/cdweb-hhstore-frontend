import { customFetch } from "./customFetch";

export const consumeByOrderDetail = async (products, orderDetail) => {
  const productIndex = products.findIndex(
    (p) => p.id === orderDetail.productId
  );
  const product = products[productIndex];
  try {
    const URL = `/api/productdetails/${product.productDetail.id}/consume/${orderDetail.quantity}`;
    const response = await customFetch(URL, "PUT");
    if (!response.ok) {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

export const restoreByOrderDetail = async (products, orderDetail) => {
  const productIndex = products.findIndex(
    (p) => p.id === orderDetail.productId
  );
  const product = products[productIndex];
  try {
    const URL = `/api/productdetails/${product.productDetail.id}/restore/${orderDetail.quantity}`;
    const response = await customFetch(URL, "PUT");
    if (!response.ok) {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};
