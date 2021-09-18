import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
// util
import { customFetch, customFetchAuth } from "../util/customFetch";
// context
import { CartContext } from "../context/CartContext";
// component
import CommentItem from "./CommentItem";
// design
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "antd/dist/antd.css";
import { Table, Rate, Image, Form, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AiFillGift } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
// custom-hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";
import useGetAuthorName from "../custom-hooks/useGetAuthorName";
// custom-funtions
import { addCartItem } from "../custom-functions";

const ProductDetail = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const productId = match.params.productid;
  const authorName = useGetAuthorName(productId);

  const userSession = useUserSessionContext();
  // cart-context for listen onchange cart-item
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  const [triggerCartContext, setTriggerCartContext] = cartContextValue2;
  //
  const [product, setProduct] = useState({
    title: "Loading...",
    mainImage: "Loading...",
    price: "Loading...",
    author: "Loading...",
    publisher: "Loading...",
    productDetail: {
      language: "Loading...",
      format: "Loading...",
      dimensions: "Loading...",
      country: "Loading...",
      code: "Loading...",
      detailDescription: "Loading...",
      dateRelease: "Loading...",
      image1: "Loading...",
      image2: "Loading...",
      numberOfProduct: "Loading...",
      purchaseNumber: "Loading...",
      promotion: "Loading...",
    },
  });

  useEffect(() => {
    getProductInfo();
  }, []);

  const getProductInfo = async () => {
    try {
      const URL = `/api/products/${productId}`;
      const response = await customFetch(URL, "GET");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  // ...
  const handleAddCartItem = async () => {
    if (userSession.loggedin === false) {
      history.push("/login");
    } else {
      const response = await addCartItem(cartItems, userSession.id, productId, {
        username: userSession.username,
        password: userSession.password,
      });
      if (response === "ok") {
        setTriggerCartContext(Math.random());
      }
    }
  };

  // load review +++++++++++++++++++++++++++++++++++++++++++++
  const [reviews, setReviews] = useState([]);
  const [reviewsChange, setReviewsChange] = useState(0);

  const averageStar = () => {
    let sum = 0;
    const reviewsClone = [...reviews];
    if (reviewsClone.length === 0) {
      return 0;
    }
    reviewsClone.forEach((review) => {
      sum += review.rating;
    });
    const average = sum / reviewsClone.length;
    console.log("Số sao: ", average);
    return average;
  };
  const averageRating = averageStar();

  const getReviews = async () => {
    const URL = `/api/reviews/product/${productId}`;
    try {
      const response = await customFetch(URL, "GET", null);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [reviewsChange]);

  // comment ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [review, setReview] = useState("");
  const typeReview = (e) => {
    setReview(e.target.value);
  };

  const [star, setStar] = useState(4);
  const onChangeRating = (e) => {
    setStar(e);
  };

  const addReview = async () => {
    const URL = "/api/reviews";
    const bodyContent = JSON.stringify({
      user: { id: userSession.id },
      product: { id: productId },
      comment: `${review}`,
      rating: star,
    });
    try {
      const response = await customFetchAuth(URL, "POST", bodyContent, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      setReviewsChange(Math.random());
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (userSession.loggedin === false) {
      history.push("/login");
    } else {
      addReview();
    }
  };

  // DESIGN -------------------------------------------------------------------------------
  // table
  const dataSource = [
    {
      key: "1",
      detail: "Code",
      value: `${product.productDetail.code}`,
    },
    {
      key: "2",
      detail: "Country",
      value: `${product.productDetail.country}`,
    },
    {
      key: "3",
      detail: "Language",
      value: `${product.productDetail.language}`,
    },
    {
      key: "4",
      detail: "Format",
      value: `${product.productDetail.format}`,
    },
    {
      key: "5",
      detail: "Dimensions",
      value: `${product.productDetail.dimensions}`,
    },
    {
      key: "6",
      detail: "Date Realease",
      value: `${product.productDetail.dateRelease}`,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSourceDetail = [
    {
      key: "1",
      detail: `${product.productDetail.detailDescription}`,
    },
  ];

  const columnDetail = [
    {
      title: "SHORT DESCRIPTION",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  // upload
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // custom css
  const fontSize = {
    fontSize: "14px",
    textDecoration: "none",
  };

  const bc = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  // END DESIGN ---------------------------------------------------------------------

  return (
    <div className="product_detail">
      <div className="product_detail_section_1">
        <div className="section_left">
          <Carousel style={bc}>
            <Carousel.Item>
              <div className="img_center">
                <Image loading="lazy" src={product.mainImage}></Image>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="img_center">
                <Image
                  loading="lazy"
                  src={product.productDetail.image1}
                ></Image>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="img_center">
                <Image
                  loading="lazy"
                  src={product.productDetail.image2}
                ></Image>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="section_right">
          <div className="main">
            <span className="product_title">{product.title}</span>
            <div className="text1">
              <p className="small_text">
                <span>Author</span>
                <Link to="/" style={fontSize}>
                  {authorName}
                </Link>
              </p>
              <p className="small_text">
                <span>Category</span>
                <Link to="/" style={fontSize}>
                  {product.category}
                </Link>
                <span>Publisher</span>
                <Link to="/" style={fontSize}>
                  {product.publisher}
                </Link>
              </p>
            </div>
            <div className="product_rating">
              <Rate disabled value={averageRating} />
            </div>
            <span className="product_reviews">
              <Link to="/" style={fontSize}>
                View {reviews.length} reviews
              </Link>
            </span>

            <div className="text2">
              <span className="purchase_number">
                {product.productDetail.numberOfProduct -
                  product.productDetail.purchaseNumber}{" "}
                remains
              </span>
              <span className="purchase_number">
                {product.productDetail.purchaseNumber} solds
              </span>
            </div>

            <div className="product_price_wrapper">
              <span className="product_price">
                {`${product.price / 1000}.000 `}
                <ins style={{ fontSize: "1.5rem" }}>đ</ins>
              </span>
              <div className="product_old_price">
                <del>{`${product.price / 1000}.000 đ`}</del>
                <span className="product_promotion">{` -${product.productDetail.promotion}%`}</span>
              </div>
            </div>
          </div>
          <button
            className="btn_addtocart"
            variant="outline-primary"
            onClick={() => handleAddCartItem()}
          >
            <IoMdCart style={{ fontSize: "1.4rem" }} />
            <span>Add to Shopping Cart</span>
          </button>
        </div>
        <div className="section_option">
          {/* <img
            height="200"
            src="https://salt.tikicdn.com/cache/280x280/ts/product/3a/86/d9/51c5872cc9b1f8776114c1484f5a8faa.jpg"
          ></img>
          <p className="text">
            <AiFillGift /> Tặng bạn voucher bộ file thuyết trình 1500+,
            Powerpoint Template, 800+ Infographic, 3000+ Icon - Tải Trực tuyến,
            truy cập TRỌN ĐỜI
          </p> */}
        </div>
      </div>
      <span className="section_title">Detail description</span>
      <div className="product_detail_section_2">
        <div className="content">
          <div className="section_left">
            <Table
              style={fontSize}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
            />
          </div>
          <div className="section_right">
            <Table
              style={fontSize}
              dataSource={dataSourceDetail}
              columns={columnDetail}
              pagination={false}
              bordered
            />
          </div>
        </div>
      </div>
      <span className="section_title">Reviews</span>
      <div className="product_detail_section_4">
        <div className="section_down">
          {reviews.map((review) => (
            <CommentItem
              key={review.id}
              userId={review.user}
              reviewId={review.id}
              comment={review.comment}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
      <span className="section_title">Comment</span>
      <div className="product_detail_section_3">
        <form className="section_up" onSubmit={submitReview}>
          <div className="haha">
            <i className="section_up_title">* Rating:</i>
            <Rate onChange={onChangeRating} />
          </div>

          <div>
            <i className="section_up_title">* Content:</i>
            <textarea
              placeholder="Type your comment here"
              className="text_area"
              value={review}
              onChange={typeReview}
            ></textarea>
          </div>

          <div>
            <i className="section_up_title">{`Upload image (optional):`}</i>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-hint">
                  Click or drag file to this area to upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>
          <button className="button_submit" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="product_detail_section_5"></div>
    </div>
  );
};

export default ProductDetail;
