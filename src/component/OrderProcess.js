import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// custom-hooks
import useUserSessionContext from "../custom-hooks/useUserSessionContext";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CartContext } from "../context/CartContext";
import { OrderTableContext } from "../context/OrderTableContext";
import { ProductContext } from "../context/ProductContext";
// util
import { residences } from "../util/address";
import { customFetchAuth } from "../util/customFetch";
import { consumeByOrderDetail } from "../util/updateNumberOfProducts";
// component
import OrderItem from "./OrderItem";
// design
import "antd/dist/antd.css";
import { Radio, Steps, Collapse, Cascader } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  CaretRightOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { GrDeliver } from "react-icons/gr";
import { MdBorderColor } from "react-icons/md";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// css
const mesStyleErr = {
  color: "#ff4d58",
};
const mesStyleFoc = {
  color: "#0d5cb6",
};
const inpStyleErr = {
  border: "0.5px solid #ff4d58",
  boxShadow: "0 0 0 5px #F8D7DA",
};
const inpStyleFoc = {
  border: "0.5px solid #0d5cb6",
  // boxShadow: "0 0 0 5px #bfdeff",
};

const { Panel } = Collapse;
const { Step } = Steps;

const OrderProcess = () => {
  const history = useHistory();
  const totalPrice = history.location.state.totalPrice;
  // get user session context
  const userSession = useUserSessionContext();
  //
  const { orderTableContextValue1, orderTableContextValue2 } =
    useContext(OrderTableContext);
  const [eventClickOrderTable, setEventClickOrderTable] =
    orderTableContextValue2;
  //
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  const [eventClickCartItem, setEventClickCartItem] = cartContextValue2;
  //
  const [products, setProducts] = useContext(ProductContext);
  // address ++++++++++++++++++++++++++++++++++++++
  // * CHECK FORM
  const schema = yup.object().shape({
    addressDetail: yup.string().required(),
    phoneNumber: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getAddress = () => {
    if (userSession.address === null) return "City,District,Street,Detail";
    if (userSession.address !== null) {
      const arrAddress = userSession.address.split(",");
      return {
        city: arrAddress[0],
        district: arrAddress[1],
        street: arrAddress[2],
        detail: arrAddress[3],
      };
    }
  };

  const [address, setAddress] = useState(() => getAddress());

  function onChangeCascaderAddress(e) {
    const newAddressArr = [...e];
    setAddress({
      ...address,
      city: newAddressArr[0],
      district: newAddressArr[1],
      street: newAddressArr[2],
    });
  }

  // state for payment method
  const [paymentMethod, setPaymentMethod] = useState(0);
  const onChangeSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  // delete cart-item by user id +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const deleteCartItemByUserId = async () => {
    const URL = `/api/cartitems/deletebyuserid/${userSession.id}`;
    try {
      const response = await customFetchAuth(URL, "DELETE", null, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) throw new Error(response.status);
    } catch (error) {
      console.log(error);
    }
    setEventClickCartItem(Math.random());
  };

  // main process order +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const getArrOrderDetail = function () {
    const arrOrderDetail = [];
    cartItems.map((c) => {
      const orderDetail = {
        productId: c.product,
        quantity: c.quantity,
      };
      arrOrderDetail.push(orderDetail);
    });
    return arrOrderDetail;
  };
  // create array of OrderDetail
  const aod = getArrOrderDetail();

  const consumeProducts = (aod) => {
    aod.forEach((orderDetail) => {
      consumeByOrderDetail(products, orderDetail);
    });
  };

  const processOrder = async (pAddressDetail, pPhoneNumber) => {
    if (userSession.loggedin === false) {
      history.push("/login");
    }
    if (aod.length === 0) {
      window.alert(
        "No product to orders, please add products to your shopping bag!"
      );
    } else {
      const URL = "/api/ordertables";
      const orderTable = {
        id: 0,
        user: { id: userSession.id },
        addressDelivery: `${address.city}, ${address.district}, ${address.street}, ${pAddressDetail}, ${pPhoneNumber}`,
        totalPrice: history.location.state.totalPrice + 14000,
        paymentMethod: paymentMethod,
        paid: paymentMethod === 0 ? 0 : 1,
        status: 1,
        orderDetails: getArrOrderDetail(),
      };
      const bodyContent = JSON.stringify(orderTable);
      try {
        const response = await customFetchAuth(URL, "POST", bodyContent, {
          username: userSession.username,
          password: userSession.password,
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        deleteCartItemByUserId();
        setEventClickOrderTable(Math.random());
        consumeProducts(aod);
        history.push("/processresult");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmitOrder = (e) => {
    processOrder(e.addressDetail, e.phoneNumber);
  };

  const radioGroupStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  };

  return (
    <form
      className="order_process_wrapper"
      onSubmit={handleSubmit(onSubmitOrder)}
    >
      <div className="order_process_wrapper_header">
        <span className="title">
          <MdBorderColor /> Checkout Process
        </span>
        <div className="step">
          <Steps>
            <Step status="finish" title="Login" icon={<UserOutlined />} />
            <Step status="finish" title="Cart" icon={<SolutionOutlined />} />
            <Step
              status="process"
              title="Checkout"
              icon={<LoadingOutlined />}
            />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
        </div>
      </div>
      <div className="order_process">
        <div className="section_left">
          <div className="address_delivery">
            <span className="title">1. Address Delivery</span>
            <div className="address_delivery_form">
              <div className="address_input_group">
                <span style={mesStyleFoc}>
                  * Address (your default address)
                </span>
                <Cascader
                  defaultValue={[
                    address.city,
                    address.district,
                    address.street,
                  ]}
                  options={residences}
                  allowClear={false}
                  onChange={onChangeCascaderAddress}
                />
              </div>
              <div className="address_input_group">
                <span style={errors.addressDetail ? mesStyleErr : mesStyleFoc}>
                  {errors.addressDetail
                    ? "* Address is required!"
                    : "* Adress detail"}
                </span>
                <input
                  name="addressDetail"
                  placeholder="Address detail"
                  style={errors.addressDetail ? inpStyleErr : inpStyleFoc}
                  {...register("addressDetail")}
                ></input>
              </div>
              <div className="address_input_group">
                <span style={errors.phoneNumber ? mesStyleErr : mesStyleFoc}>
                  {errors.phoneNumber
                    ? "* Phone number is required!"
                    : "* Phone number"}
                </span>
                <input
                  name="phoneNumber"
                  placeholder="Phone number"
                  defaultValue={userSession.phoneNumber}
                  style={errors.phoneNumber ? inpStyleErr : inpStyleFoc}
                  {...register("phoneNumber")}
                ></input>
              </div>
            </div>
          </div>

          <div className="payment_method">
            <span className="title">2. Payment Method</span>
            <div className="radio_group">
              <Radio.Group
                style={radioGroupStyle}
                onChange={onChangeSelectPaymentMethod}
                value={paymentMethod}
              >
                <div className="radio_wrap">
                  <Radio value={0}>
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"></img>
                  </Radio>
                  <span>Pay after receiving the payload</span>
                </div>
                <div className="radio_wrap">
                  <Radio value={1}>
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg"></img>
                  </Radio>
                  <span>MoMo</span>
                </div>
                <div className="radio_wrap">
                  <Radio value={2}>
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg"></img>
                  </Radio>
                  <span>ZaloPay</span>
                </div>
              </Radio.Group>
            </div>
          </div>

          <div className="delivery_method">
            <span className="title">3. Delivery Method</span>
            <div className="delivery_method_content">
              <Radio.Group value="ok">
                <Radio value="ok">
                  <span className="radio_label">
                    Standard Delivery (about 3 days)
                  </span>
                </Radio>
              </Radio.Group>
              <i>Transport fee: 14.000 đ</i>
            </div>
          </div>
        </div>
        <div className="section_right">
          <div className="order">
            <span className="title">Order Summary</span>
            <div className="order_detail_item">
              <Collapse
                defaultActiveKey={["1"]}
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                ghost={true}
              >
                <Panel
                  header="View Detail"
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  {cartItems.map((cartItem) => (
                    <OrderItem key={cartItem.id} cartItemProps={cartItem} />
                  ))}
                </Panel>
              </Collapse>
              <div className="div_total_price">
                <p className="total_price">Total price of all product</p>
                <p className="total_price">{`${
                  history.location.state.totalPrice / 1000
                }.000 đ`}</p>
              </div>
            </div>
          </div>
          <div className="total_money">
            <div>
              <span className="text">Total Order Price</span>
              <span className="total_money_number">
                {`${(history.location.state.totalPrice + 14000) / 1000}.000 đ`}
              </span>
            </div>
            <button type="submit" className="btn_order">
              <GrDeliver />
              <span>Confirm Order</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderProcess;
