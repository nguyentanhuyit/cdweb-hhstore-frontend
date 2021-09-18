import React from "react";
// design
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCardHome = (props) => {
  // css for link
  const linkStyle = {
    textDecoration: "none",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div className="product_card_home">
      <Link to={`/products/product/${props.productId}`} style={linkStyle}>
        <img
          className="card_image"
          loading="lazy"
          src={props.mainImage}
          alt="..."
        ></img>
        <div className="card_title_wrapper">
          <p className="card_title">{props.title}</p>
        </div>
      </Link>
      <div className="card_body">
        <p className="card_author">{props.author && props.author.authorName}</p>
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
          <span className="card_reviews">({props.reviews.length} reviews)</span>
        </div>
        <div className="card_price">
          <p className="card_price_number">{`${props.price / 1000}.000 đ`}</p>
          <p className="card_price_promotion">-{props.discount}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHome;
