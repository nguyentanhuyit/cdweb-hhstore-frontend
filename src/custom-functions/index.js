import { customFetchAuth } from "../util/customFetch";
import { notification } from "antd";
const openNotification = (placement) => {
  notification.success({
    message: "View your shopping bag!",
    description: "Shopping bag changed.",
    placement,
  });
};

export const addCartItem = async (cartItems, userId, productId, auth) => {
  console.log("Add cart item is working...");

  const filterCartItems = cartItems.filter(
    (cartItem) => cartItem.user === userId && cartItem.product === productId
  );
  const cartItemFound =
    filterCartItems.length === 0 ? null : filterCartItems[0];

  const methodType = cartItemFound === null ? "POST" : "PUT";
  const cartItemPayload = {
    id: cartItemFound === null ? 0 : cartItemFound.id,
    user: {
      id: userId,
    },
    product: {
      id: productId,
    },
    quantity: cartItemFound === null ? 1 : cartItemFound.quantity + 1,
  };

  try {
    const URL = `/api/cartitems`;
    const bodyContent = JSON.stringify(cartItemPayload);
    const response = await customFetchAuth(URL, methodType, bodyContent, {
      username: auth.username,
      password: auth.password,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    openNotification("bottomRight");
    return "ok";
  } catch (error) {
    return "failed";
  }
};

export const updateCartItemQuantity = async (cartItem, actionType, auth) => {
  try {
    if (actionType === "add") {
      cartItem.quantity = cartItem.quantity + 1;
    }
    if (actionType === "reduce") {
      cartItem.quantity = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
    }
    const cartItemPayload = {
      id: cartItem.id,
      user: {
        id: cartItem.user,
      },
      product: {
        id: cartItem.product,
      },
      quantity: cartItem.quantity,
    };
    const URL = "/api/cartitems";
    const bodyContent = JSON.stringify(cartItemPayload);
    const response = await customFetchAuth(URL, "PUT", bodyContent, {
      username: auth.username,
      password: auth.password,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    openNotification("bottomRight");
    return "ok";
  } catch (error) {
    return "failed";
  }
};
