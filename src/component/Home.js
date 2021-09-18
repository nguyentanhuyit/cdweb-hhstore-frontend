import React, { useEffect, useState } from "react";
// util
import { customFetch } from "../util/customFetch";
import { Link } from "react-router-dom";
// design
import "antd/dist/antd.css";
import background from "../img/background.png";
// import { Carousel } from "react-bootstrap";
import Carousel, { consts } from "react-elastic-carousel";
//
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
//

// carousel
const myArrow = ({ type, onClick, isEdge }) => {
  const iconStyle = {
    color: "#0d5cb6",
    fontSize: "3rem",
  };
  const pointer =
    type === consts.PREV ? (
      <BsChevronCompactLeft style={iconStyle} />
    ) : (
      <BsChevronCompactRight style={iconStyle} />
    );
  return (
    <button className="btn_carousel" onClick={onClick} disabled={isEdge}>
      <div className="btn_carousel_icon_border">
        <div>{pointer}</div>
      </div>
    </button>
  );
};

const Home = () => {
  const [productShows, setProductShows] = useState([]);

  useEffect(() => {
    getProductShows();
  }, []);

  const getProductShows = async () => {
    try {
      const URL =
        "/api/products/params?sortBy=productDetailPurchaseNumber&desc=true";
      const response = await customFetch(URL, "GET");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setProductShows(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="section1">
        <div className="section_left">
          <img src={background}></img>
          <span>Explore your favourite books</span>
          <div className="main_text">
            <span>Get Your New</span>
            <span style={{ display: "flex" }}>
              <span className="special_b">B</span>ook With The
            </span>
            <span>Best Price</span>
          </div>
          <button className="btn_home_shop_now">
            <Link to="/products/params">Shop Now !</Link>
          </button>
        </div>
        <div className="section_right">
          <div className="product_show_border">
            <span className="product_show_title">Top sellers on H&H Store</span>
            <Carousel renderArrow={myArrow} itemsToShow={3}>
              {productShows.map((product) => (
                <div className="product_card_show" key={product.id}>
                  <img src={product.mainImage}></img>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="product_show_border">
            <span className="product_show_title">New release books</span>
            <Carousel renderArrow={myArrow} itemsToShow={3}>
              {productShows.map((product) => (
                <div className="product_card_show" key={product.id}>
                  <img src={product.mainImage}></img>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
