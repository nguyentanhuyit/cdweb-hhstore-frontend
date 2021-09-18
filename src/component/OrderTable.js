import React, { useContext } from "react";
// component
import OrderDetail from "./OrderDetail";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { OrderTableContext } from "../context/OrderTableContext";
import { ProductContext } from "../context/ProductContext";
// util
import { customFetchAuth } from "../util/customFetch";
import { restoreByOrderDetail } from "../util/updateNumberOfProducts";
// lazyload
import LazyLoad from "react-lazyload";
import OrderCardLoading from "../util/OrderCardLoading";
// design
import "antd/dist/antd.css";
import { Collapse, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { Popconfirm, message } from "antd";

const text = "Are you sure to cancel this order?";

const openNotification = (placement) => {
  notification.success({
    message: "Cancel order successfully!",
    description: "Keep buying!",
    placement,
  });
};

const { Panel } = Collapse;

const OrderTable = (props) => {
  const { orderTableProps } = props;
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get order-table-context
  const { orderTableContextValue1, orderTableContextValue2 } =
    useContext(OrderTableContext);
  const [eventClickOrderTable, setEventClickOrderTable] =
    orderTableContextValue2;
  // get all product
  const [products, setProducts] = useContext(ProductContext);

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const restoreProducts = (aod) => {
    aod.forEach((orderDetail) => {
      restoreByOrderDetail(products, orderDetail);
    });
  };

  const cancelOrder = async () => {
    const URL = "/api/ordertables";
    const orderTableObject = {
      id: orderTableProps.id,
      user: { id: orderTableProps.user },
      addressDelivery: `${orderTableProps.addressDelivery}`,
      totalPrice: orderTableProps.totalPrice,
      paymentMethod: orderTableProps.paymentMethod,
      paid: orderTableProps.paid,
      status: 4,
      orderDetails: orderTableProps.orderDetails,
    };
    const bodyContent = JSON.stringify(orderTableObject);
    try {
      const response = await customFetchAuth(URL, "PUT", bodyContent, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      setEventClickOrderTable(Math.random());
      restoreProducts(orderTableProps.orderDetails);
      openNotification("bottomRight");
    } catch (error) {
      console.log(error);
    }
  };

  function confirm() {
    cancelOrder();
  }

  const getPaymentMethod = (p) => {
    if (p === 0) return "Pay after receiving";
    if (p === 1) return "Payment via MoMo wallet";
    if (p === 2) return "Payment via ZaloPay";
    if (p === 3) return "Payment via Paypal";
  };

  const getOrderStatus = (p) => {
    if (p === 1) return "Waiting for confirmation";
    if (p === 2) return "Being shipped";
    if (p === 3) return "Delivered";
    if (p === 4) return "Cancelled";
  };

  return (
    <LazyLoad
      height={310}
      offset={[-310, 0]}
      debounce={200}
      placeholder={<OrderCardLoading />}
    >
      <div className="order_table">
        <div className="header">
          <div className="header_left">
            <span className="title">No: PLH-{orderTableProps.id}</span>
            <div className="text">
              <span>Total:</span>
              <span className="text_value">{`${
                orderTableProps.totalPrice / 1000
              }.000 đ`}</span>
            </div>
            <div className="div_btn">
              {orderTableProps.status === 4 ? (
                <button className="btn_cancel_order" disabled>
                  Cancelled
                </button>
              ) : (
                <Popconfirm
                  placement="bottomRight"
                  title={text}
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="btn_cancel_order">Cancel Order</button>
                </Popconfirm>
              )}
            </div>
          </div>

          <div className="header_right"></div>
        </div>
        <div className="body">
          <div className="section1">
            <div className="block">
              <div className="block_title">ORDER INFO</div>
              <div className="block_text">
                <div className="text_title">
                  <span>Date created</span>
                  <span>Paid status</span>
                  <span>Order status</span>
                </div>
                <div className="text_value">
                  <span>{orderTableProps.dateCreated}</span>
                  <span>{orderTableProps.paid === 0 ? `Unpaid` : `Paid`}</span>
                  <span>{`${getOrderStatus(orderTableProps.status)}`}</span>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="block_title">ADDRESS DELIVERY</div>
              <div className="block_text">
                <div className="text_title">
                  <span>Payment</span>
                  <span>Address</span>
                </div>
                <div className="text_value">
                  <span>{`${getPaymentMethod(
                    orderTableProps.paymentMethod
                  )}`}</span>
                  <span>{orderTableProps.addressDelivery}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="order_details">
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
                  header="View Ordered Book"
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  {orderTableProps.orderDetails.map((orderDetail) => (
                    <OrderDetail
                      key={orderDetail.productId}
                      orderDetailProps={orderDetail}
                    />
                  ))}
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

export default OrderTable;
