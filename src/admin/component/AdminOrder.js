import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { UserContext } from "../../context/UserContext";
//import util
import { customFetch } from "../util/customFetch";
const AdminOrder = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [preOrder, setPreOrder] = useState([]);
  const [search, setSearch] = useState("");
  const [optionSearchs, setOptionSearch] = useState([]);

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const getOrders = async () => {
    const URL = "/api/ordertables";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setOrders(data);
      setPreOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  //style
  const linkStyle = {
    color: "black",
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

  //get user by iD
  const getUserByID = (id) => {
    const user = users.filter((u) => {
      return u.id == id;
    });
    return user[0];
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

  //get day in order item
  function getDay(date) {
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    return day;
  }
  //get month in order item
  function getMonth(date) {
    const currentDate = new Date(date);
    const month = currentDate.getMonth();
    return month;
  }
  //sort day, month
  function sortDate(event) {
    const value = event.target.value;
    const curentDate = new Date();

    if (value == 0) {
      setOrders(preOrder);
    } else if (value == 1) {
      const order = preOrder.filter((o) => {
        return getDay(o.dateCreated) == curentDate.getDate();
      });
      setOrders(order);
    } else if (value == 2) {
      const order = preOrder.filter((o) => {
        return getMonth(o.dateCreated) == curentDate.getMonth();
      });
      setOrders(order);
    }
  }

  //search product
  const updateSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
      setOrders(preOrder);
    } else {
      const options = preOrder.filter((order) => {
        return (
          order.addressDelivery
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          order.id == e.target.value.toLowerCase()
        );
      });
      setOptionSearch(options);
      setOrders(options);
    }
  };

  const listOrder = orders.map((order) => (
    <tr>
      <td className="uneditable center">{order.id}</td>
      <td className="uneditable">{getUserByID(order.user)?.username}</td>
      <td className="uneditable">{order.dateCreated}</td>
      <td className="uneditable center">{order.addressDelivery}</td>
      <td className="uneditable center">{order.totalPrice}đ</td>
      <td className="center">{getPaymentMethod(order.paymentMethod)}</td>
      <td className="uneditable">{getOrderPaid(order.paid)}</td>
      <td className="uneditable">{getOrderStatus(order.status)}</td>
      <td>
        <Link to={`/admin/orders/orderDetail/${order.id}`}>
          <i className="fa fa-eye"></i>
        </Link>
      </td>
      <td className="uneditable">
        <span>
          <Link to={`/admin/orders/UpdateOrder/${order.id}`} style={linkStyle}>
            <i class="fa fa-edit"></i>
          </Link>
        </span>
      </td>
    </tr>
  ));
  return (
    <div id="main-content">
      <div className="admin">
        <div className="admin_header">Đặt hàng</div>
        <div className="admin_table">
          <div>
            <div className="row w3-res-tb">
              <div className="col-sm-3 m-b-xs">
                <div className="input-group">
                  <select
                    className="input-sm form-control w-sm inline v-middle"
                    onChange={sortDate}
                  >
                    <option value="0">--Tất cả--</option>
                    <option value="1">Hôm nay</option>
                    <option value="2">Tháng này</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="input-group">
                  <input
                    type="text"
                    className="input-sm form-control"
                    placeholder="Search"
                    value={search}
                    onChange={updateSearch}
                    onKeyUp={autoComplete}
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-sm btn-default" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-sm-4 m-b-xs"></div>
            </div>
            <table
              className="col-xs-12 col-lg-12"
              id="editable"
              className="pure-table pure-table-bordered"
            >
              <tr>
                <td title="Mã đơn hàng" className="uneditable">
                  Mã ĐH
                </td>
                <td className="uneditable">Khách hàng</td>
                <td title="Ngày đặt hàng" className="uneditable">
                  Ngày ĐH
                </td>
                <td title="Địa chỉ giao hàng" className="uneditable">
                  Địa chỉ GH
                </td>
                <td className="uneditable">Tổng giá</td>
                <td className="uneditable" title="Phương thức thanh toán">
                  Phương thức TT
                </td>
                <td>Thanh toán</td>
                <td title="Trạng thái đơn hàng">Trạng thái ĐH</td>
                <td className="uneditable">Chi tiết</td>
                <td className="uneditable">Action</td>
              </tr>
              {listOrder}
            </table>
            <div className="panel-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminOrder;
