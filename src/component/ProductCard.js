import React, { useContext } from "react";
// context
import { CartContext } from "../context/CartContext";
// util
// design
import { AiFillStar } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { Skeleton } from "antd";
import { IoMdCart } from "react-icons/io";
// lazyload
import ProductCardLoading from "../util/ProductCardLoading";
import LazyLoad from "react-lazyload";
// custom hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";
import useGetAuthorName from "../custom-hooks/useGetAuthorName";
// custom-funtions
import { addCartItem } from "../custom-functions";

const ProductCard = (props) => {
  const { productProps } = props;
  const history = useHistory();
  // const [userSession, setUserSession] = userSessionContextValue1;
  const userSession = useUserSessionContext();
  // get cart-context
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  const [triggerCartContext, setTriggerCartContext] = cartContextValue2;

  const authorName = useGetAuthorName(productProps.id);

  const redirectToProductDetail = () => {
    history.push(`/products/product/${productProps.id}`);
  };

  const handleAddCartItem = async () => {
    if (userSession.loggedin === false) {
      history.push("/login");
    } else {
      const response = await addCartItem(
        cartItems,
        userSession.id,
        productProps.id,
        {
          username: userSession.username,
          password: userSession.password,
        }
      );
      if (response === "ok") {
        setTriggerCartContext(Math.random());
      }
    }
  };

  return (
    <LazyLoad
      height={380}
      offset={[-380, 0]}
      debounce={500}
      placeholder={<ProductCardLoading />}
    >
      <div className="product_card">
        <LazyLoad once={true} placeholder={<Skeleton.Image />}>
          <div onClick={redirectToProductDetail}>
            <img
              className="card_image"
              loading="lazy"
              src={productProps.mainImage}
              alt="..."
            ></img>
            <div className="card_title_wrapper">
              <p className="card_title">{productProps.title}</p>
            </div>
          </div>
        </LazyLoad>
        <div className="card_body">
          <p className="card_author">{authorName}</p>
          <div className="card_rating">
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="card_reviews">5 reviews</span>
          </div>
          <div className="card_price">
            <p className="card_price_number">{`${
              productProps.price / 1000
            }.000 đ`}</p>
            <div className="card_price_promotion">
              -{productProps.productDetail.promotion}%
            </div>
          </div>
          <button
            className="product_card_button"
            onClick={() => handleAddCartItem()}
          >
            <IoMdCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </LazyLoad>
  );
};

export default ProductCard;
