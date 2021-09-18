import React, { useContext } from "react";
import {
  Switch,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import ProductList from "./ProductList";
import ComponentTest from "./ComponentTest";
import NavigateLink from "./NavigateLink";
// context
import { CategoryContext } from "../context/CategoryContext";
import { AuthorContext } from "../context/AuthorContext";
// form
import { useForm } from "react-hook-form";
// design
import { Rate, Radio } from "antd";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FcFlashOn } from "react-icons/fc";
import { FiList } from "react-icons/fi";

const styleRadioGroup = {
  all: "unset",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",
};
const styleRadio = {
  all: "unset",
  fontSize: "0.8rem",
};
const fontWeightBold = {
  fontSize: "1.2rem",
};

const ProductListSwitch = () => {
  const [categories, setCategories] = useContext(CategoryContext);
  const [authors, setAuthors] = useContext(AuthorContext);

  const match = useRouteMatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const history = useHistory();

  // price filter
  const { register, handleSubmit, errors } = useForm();
  const onSubmitFormPrice = (e) => {
    console.log(e);
    params.set("priceFrom", e.priceFrom);
    params.set("priceTo", e.priceTo);
    if (e.priceFrom === "" || e.priceTo === "") {
      params.delete("priceFrom");
      params.delete("priceTo");
    }
    history.push(`${location.pathname}?${params.toString()}`);
  };

  // left filter
  const onchangeFilterCategory = (e) => {
    params.set("categoryId", e.target.value);
    if (e.target.value == 0) {
      params.delete("categoryId");
    }
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const onChangeFilterAuthor = (e) => {
    params.set("authorId", e.target.value);
    if (e.target.value == 0) {
      params.delete("authorId");
    }
    history.push(`${location.pathname}?${params.toString()}`);
  };

  // filter bar
  const onChangeSortBy = (sortBy, desc = "false") => {
    params.set("sortBy", sortBy);
    params.set("desc", desc);
    if (sortBy === "id") {
      params.delete("sortBy");
      params.delete("desc");
    }
    history.push(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="product_list_switch">
      <div className="product_list_switch_header">
        <NavigateLink link1={"store"} link2={"books"} />
        <span>Product List</span>
      </div>
      <div className="product_list_switch_header2">
        <div className="main_title">
          <FiList style={fontWeightBold} /> <span>ALL FILTERS</span>
        </div>
        <div className="filter_bar">
          <span style={{ all: "unset" }}>Sort by:</span>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("id")}
          >
            Reset
          </button>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("productDetailPurchaseNumber")}
          >
            Best Seller
          </button>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("productDetailPromotion")}
          >
            Hot Discount
          </button>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("productDetailDateRelease")}
          >
            New Books
          </button>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("price")}
          >
            From low price <BsArrowDown />
          </button>
          <button
            className="normal_btn btn_filter"
            onClick={() => onChangeSortBy("price", "true")}
          >
            From high price <BsArrowUp />
          </button>
        </div>
      </div>
      <div className="product_list_switch_body">
        <div className="filter_left">
          <div className="filter_rating">
            <span className="filter_title">Filter by rating</span>
            <Radio.Group style={styleRadioGroup}>
              <Radio value={5} style={styleRadio}>
                <Rate disabled value={5} />
              </Radio>
              {/* <Radio value={4} style={styleRadio}>
                <Rate disabled value={4} />
              </Radio>
              <Radio value={3} style={styleRadio}>
                <Rate disabled value={3} />
              </Radio> */}
            </Radio.Group>
          </div>

          <form
            className="filter_price"
            onSubmit={handleSubmit(onSubmitFormPrice)}
          >
            <span className="filter_title">Price range</span>
            <input
              name="priceFrom"
              {...register("priceFrom")}
              placeholder="From"
            ></input>
            <input
              name="priceTo"
              {...register("priceTo")}
              placeholder="To"
            ></input>
            <button className="normal_btn" type="submit">
              Filter
            </button>
          </form>

          <div className="filter_category">
            <span className="filter_title">Categories</span>
            <div className="radioGroupOverflow">
              <Radio.Group
                onChange={onchangeFilterCategory}
                style={styleRadioGroup}
              >
                <Radio value={0} style={styleRadio}>
                  All category
                </Radio>
                {categories.map((category) => (
                  <Radio value={category.id} style={styleRadio}>
                    <span style={{ fontSize: "0.9rem" }}>
                      {category.categoryName}
                    </span>
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>

          <div className="filter_author">
            <span className="filter_title">Authors</span>
            <div className="radioGroupOverflow">
              <Radio.Group
                onChange={onChangeFilterAuthor}
                style={styleRadioGroup}
              >
                <Radio value={0} style={styleRadio}>
                  All author
                </Radio>
                {authors.map((author) => (
                  <Radio value={author.id} style={styleRadio}>
                    <span style={{ fontSize: "0.9rem" }}>
                      {author.authorName}
                    </span>
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        <Switch>
          {/* <Redirect from={`${match.url}`} to={`${match.url}/params`}></Redirect> */}
          <Route path={`${match.url}`} exact component={ComponentTest}></Route>
          <Route path={`${match.url}/params`} component={ProductList}></Route>
          <Route path={`${match.url}/search`} component={ProductList}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProductListSwitch;
