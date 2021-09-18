import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import util
import { customFetch } from "../util/customFetch";
//import context
import { ProductContext } from "../../context/ProductContext";
const AdminOrderDetail = ({ match }) => {
  const orderId = match.params.orderID;
  const [order, setOrder] = useState();
  const [products, setProducts] = useContext(ProductContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOrder();
    getUsers();
  }, []);

  const getOrder = async () => {
    const URL = `/api/ordertables/${orderId}`;
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductByID = (id) => {
    const product = products.filter((p) => {
      return p.id == id;
    });
    return product[0];
  };

  const getUsers = async () => {
    const URL = "/api/users";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get payment method
  const getPaymentMethod = (p) => {
    if (p === 0) return "Pay after receiving";
    if (p === 1) return "Payment via MoMo wallet";
    if (p === 2) return "Payment via ZaloPay";
    if (p === 3) return "Payment via Paypal";
  };

  //get order status
  const getOrderStatus = (p) => {
    if (p === 1) return "Waiting for confirmation";
    if (p === 2) return "Being shipped";
    if (p === 3) return "Delivered";
    if (p === 4) return "Cancelled";
  };

  //get order paid
  const getOrderPaid = (p) => {
    if (p === 0) return "unpaid";
    if (p === 1) return "paid";
  };

  //get user by iD
  const getUserByID = (id) => {
    const user = users.filter((u) => {
      return u.id == id;
    });
    return user[0];
  };
  const listOrderDetail = order?.orderDetails.map((o) => (
    <tr>
      <td>{o?.productId}</td>
      <td>{getProductByID(o?.productId)?.title}</td>
      <td>{o.quantity}</td>
      <td>{getProductByID(o?.productId)?.price}đ</td>
      <td>{o.quantity * getProductByID(o?.productId)?.price}đ</td>
    </tr>
  ));
  const rowStyle = {
    width: "50%",
    margin: "auto",
  };
  const containStyle = {
    padding: "10px",
  };

  return (
    <div id="main-content">
      <div className="main_container">
        <span className="admin_form_title">Chi tiết đơn hàng</span>
        <div className="panel panel-default">
          <div className="order" style={containStyle}>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Mã ĐH:</div>
              <div className="col-sm-8">{order?.id}</div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Tên KH:</div>
              <div className="col-sm-8">
                {getUserByID(order?.user)?.username}
              </div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Ngày ĐH:</div>
              <div className="col-sm-8">{order?.dateCreated}</div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Địa chỉ giao hàng:</div>
              <div className="col-sm-8">{order?.addressDelivery}</div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Tổng giá:</div>
              <div className="col-sm-8">{order?.totalPrice}</div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Phương thức TT:</div>
              <div className="col-sm-8">
                {getPaymentMethod(order?.paymentMethod)}
              </div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Thanh toán:</div>
              <div className="col-sm-8">{getOrderPaid(order?.paid)}</div>
            </div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-4">Trạng thái ĐH:</div>
              <div className="col-sm-8">{getOrderStatus(order?.status)}</div>
            </div>
          </div>
          <div>
            <table className="col-xs-12 col-lg-12">
              <tr>
                <td>Mã sản phẩm</td>
                <td>Tên sản phẩm</td>
                <td>Số lượng</td>
                <td>Đơn giá</td>
                <td>Tổng giá</td>
              </tr>
              {listOrderDetail}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminOrderDetail;
