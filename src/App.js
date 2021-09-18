import React from "react";
// router dom
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// css
import "./App.css";
// context provider
import { UserSessionProvider } from "./context/UserSessionContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthorProvider } from "./context/AuthorContext";
import { OrderTableProvider } from "./context/OrderTableContext";
// component
// utils
import PrivateRoute from "./util/PrivateRoute";
import NotFound from "./util/NotFound";
import Loading from "./util/Loading";
//
import { BackTop } from "antd";
import { BsArrowUp } from "react-icons/bs";
import UserSwitch from "./UserSwitch";
//

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

function App() {
  const Header = React.lazy(() => import("./component/Header"));
  const Footer = React.lazy(() => import("./component/Footer"));
  const ProductListSwitch = React.lazy(() =>
    import("./component/ProductListSwitch")
  );
  const ProductDetail = React.lazy(() => import("./component/ProductDetail"));
  const Home = React.lazy(() => import("./component/Home"));
  const Login = React.lazy(() => import("./component/Login"));
  const Signup = React.lazy(() => import("./component/Signup"));
  const VerifyAccount = React.lazy(() => import("./component/VerifyAccount"));
  const Cart = React.lazy(() => import("./component/Cart"));
  const OrderProcess = React.lazy(() => import("./component/OrderProcess"));
  const OrderTableList = React.lazy(() => import("./component/OrderTableList"));
  const ProcessResult = React.lazy(() => import("./component/ProcessResult"));
  // admin import
  const AdminSwitch = React.lazy(() => import("./admin/AdminSwitch"));
  const AdminRoute = React.lazy(() => import("./admin/util/AdminRoute"));

  return (
    // user session wrap all component
    <Suspense fallback={<Loading />}>
      <UserSessionProvider>
        <CategoryProvider>
          <CartProvider>
            <OrderTableProvider>
              <ProductProvider>
                <AuthorProvider>
                  <Router>
                    <div className="App">
                      <Header />

                      <Switch>
                        <Redirect exact from="/" to="/home"></Redirect>
                        <Route path="/home" exact component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <PrivateRoute
                          path="/verify"
                          component={VerifyAccount}
                        ></PrivateRoute>
                        {/* ------------------------------------------------- */}
                        <Route
                          path="/products/product/:productid"
                          exact
                          component={ProductDetail}
                        ></Route>
                        <Route
                          path="/products"
                          component={() => <ProductListSwitch />}
                        ></Route>
                        {/* ------------------------------------------------ */}
                        <PrivateRoute
                          path="/cart"
                          component={Cart}
                        ></PrivateRoute>
                        <PrivateRoute
                          path="/orderprocess"
                          component={OrderProcess}
                        ></PrivateRoute>
                        <PrivateRoute
                          path="/processresult"
                          component={ProcessResult}
                        ></PrivateRoute>
                        <PrivateRoute
                          path="/ordertablelist"
                          component={OrderTableList}
                        ></PrivateRoute>
                        <PrivateRoute
                          path="/user"
                          component={() => <UserSwitch />}
                        ></PrivateRoute>
                        {/* ADMIN  */}
                        <AdminRoute
                          path="/admin"
                          component={() => <AdminSwitch />}
                        ></AdminRoute>
                        {/* NOT FOUND */}
                        <Route component={() => <NotFound />}></Route>
                      </Switch>
                      <Footer />
                      <BackTop>
                        <div style={style}>
                          <BsArrowUp />
                        </div>
                      </BackTop>
                    </div>
                  </Router>
                </AuthorProvider>
              </ProductProvider>
            </OrderTableProvider>
          </CartProvider>
        </CategoryProvider>
      </UserSessionProvider>
    </Suspense>
  );
}

export default App;
