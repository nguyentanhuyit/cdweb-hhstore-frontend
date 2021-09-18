import React, { useContext, useState } from "react";
// logo
import logo from "../logo.svg";
// router dom
import { Link, useHistory, useLocation } from "react-router-dom";
// component
import AutoCompleteOption from "../component/AutoCompleteOption";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CategoryContext } from "../context/CategoryContext";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { AuthorContext } from "../context/AuthorContext";
// design
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { Navbar, Badge } from "react-bootstrap";
import { Menu, Dropdown, Input } from "antd";
// import { Badge, Card } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import { FiUser, FiList, FiShoppingBag } from "react-icons/fi";
import { FaLeaf, FaStoreAlt } from "react-icons/fa";

// custom css
const linkStyle = {
  textDecoration: "none",
  color: "white",
};
const linkMenuItemStyle = {
  textDecoration: "none",
  fontSize: "14px",
};
const linkMenuItemStyleBig = {
  textDecoration: "none",
  fontSize: "16px",
};
const fontSizeIcon = {
  fontSize: "2.2rem",
};
const logoIcon = {
  color: "#FFF100",
};

const Header = () => {
  const history = useHistory();
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get all categories
  const [categories, setCategories] = useContext(CategoryContext);
  // get all authors
  const [authors, setAuthors] = useContext(AuthorContext);
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  // get all cart-items by user id
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;

  //

  const [autoCompleteStyle, setAutoCompleteStyle] = useState({
    display: "none",
  });

  // search
  const [search, setSearch] = useState("");
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // search auto complete
  const [optionSearchs, setOptionSearch] = useState([]);
  const submitSearchAction = (e) => {
    e.preventDefault();
    setOptionSearch([]);
    if (search === "") {
      history.push("/products/params");
    } else {
      history.push(`/products/search?search=${search}`);
    }
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
    } else {
      const options = products.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setOptionSearch(options);
    }
  };

  // header-item: categories item dropdown
  const menuCategories = (
    <Menu>
      <Menu.ItemGroup title="">
        {categories.map((category) => (
          <Menu.Item key={category.id}>
            <Link
              to={`/products/params?categoryId=${category.id}`}
              style={linkMenuItemStyle}
            >
              {category.categoryName}
            </Link>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  const menuAuthors = (
    <Menu>
      <Menu.ItemGroup title="">
        {authors.map((author) => (
          <Menu.Item key={author.id}>
            <Link
              to={`/products/params?authorId=${author.id}`}
              style={linkMenuItemStyle}
            >
              {author.authorName}
            </Link>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  // * logout method
  const logout = () => {
    try {
      localStorage.clear();
      setUserSession({
        loggedin: false,
        username: "login",
        password: "none",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  const redirectToLogin = () => {
    history.push({
      pathname: "/login",
      state: {
        from: "/signup",
      },
    });
  };

  // header-item: account item dropdown
  const accountItemDropdown =
    // depends on the user-session loggedin property
    userSession.loggedin === false ? (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <p onClick={redirectToLogin}>Sign In</p>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup" style={linkMenuItemStyleBig}>
              Sign Up
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/sendmail" style={linkMenuItemStyleBig}>
              Send Mail
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    ) : (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <Link to="/ordertablelist" style={linkMenuItemStyleBig}>
              Order list
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/user/account/profile" style={linkMenuItemStyleBig}>
              My Account
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/verify" style={linkMenuItemStyleBig}>
              Verify Account
            </Link>
          </Menu.Item>
          {userSession.roles.includes(1) ? (
            <Menu.Item>
              <Link to="/admin" style={linkMenuItemStyleBig}>
                Admin
              </Link>
            </Menu.Item>
          ) : (
            <div></div>
          )}
          <Menu.Item>
            <p onClick={logout}>Sign Out</p>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );

  return (
    <Navbar sticky="top" className="header" expand="lg">
      <div className="header_nav">
        <div className="header_logo">
          <div className="logo">
            <FaLeaf style={logoIcon} />
          </div>
          <Link to="/" style={linkStyle}>
            <p className="header_logo_text">H&H Store</p>
          </Link>
        </div>
        <div className="header_items header_items_left">
          <Link to="/products/params">
            <div className="header_item">
              <FaStoreAlt />
              <span>Store</span>
            </div>
          </Link>
          <Dropdown overlay={menuCategories} trigger={["click"]} arrow>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="header_item">
                <span>Categories</span>
                <BsCaretDownFill />
              </div>
            </a>
          </Dropdown>

          <Dropdown overlay={menuAuthors} trigger={["click"]} arrow>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="header_item">
                <span>Authors</span>
                <BsCaretDownFill />
              </div>
            </a>
          </Dropdown>

          <Link to="/products/params?sortBy=productDetailPurchaseNumber&desc=true">
            <div className="header_item">
              <span>Best Seller</span>
            </div>
          </Link>
        </div>

        <form className="header_search_form" onSubmit={submitSearchAction}>
          <div className="header_search_form_container">
            <input
              className="header_search_input"
              value={search}
              onChange={updateSearch}
              onKeyUp={autoComplete}
            ></input>
            <div className="auto_complete">
              {optionSearchs.map((optionSearch) => (
                <AutoCompleteOption
                  key={optionSearch.id}
                  optionText={optionSearch.title}
                  productId={optionSearch.id}
                  categoryId={optionSearch.category}
                />
              ))}
            </div>
            <button className="search_button" type="submit">
              <BiSearchAlt />
            </button>
          </div>
        </form>
        <div className="header_items header_items_right">
          <Dropdown overlay={accountItemDropdown} trigger={["click"]} arrow>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="header_item">
                <div className="border_avatar_icon">
                  <FiUser style={{ color: "#0046be" }} />
                </div>
                <span>{userSession.username}</span>
              </div>
            </a>
          </Dropdown>
          <Link to={`/cart`}>
            <div className="header_item">
              <AiOutlineShoppingCart style={fontSizeIcon} />
              <div className="header_item_cart">
                <Badge pill variant="warning" className="cart_badge">
                  {cartItems.length}
                </Badge>
                <span>Cart</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
