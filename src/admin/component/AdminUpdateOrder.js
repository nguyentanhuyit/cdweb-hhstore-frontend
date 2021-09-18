import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import util
import { customFetch, customFetchAuth } from "../util/customFetch";
//import react hook form
import { useForm } from "react-hook-form";
//import react yup (validation)
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import notify
import { notification } from "antd";
//import context
import { UserSessionContext } from "../../context/UserSessionContext";

const openNotification = (placement) => {
  notification.success({
    message: "Cập nhật sản phẩm!",
    description: "Cập nhật sản phẩm thành công",
    placement,
  });
};
const AdminUpdateContext = ({ match }) => {
  const history = useHistory();
  const orderId = match.params.orderID;
  const [order, setOrder] = useState();
  const [users, setUsers] = useState([]);
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userContext, setUserContext] = userSessionContextValue1;

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

  const getUserByID = (id) => {
    const user = users.filter((u) => {
      return u.id == id;
    });
    return user[0];
  };

  //validate form
  const schema = yup.object().shape({
    paid: yup.number(),
    status: yup.number(),
  });
  // handle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //reset các field của form
  useEffect(() => {
    reset({
      paid: order?.paid,
      status: order?.status,
    });
  }, [order]);

  //form style
  const formStyle = {
    width: "100%",
  };

  //submit form

  const onSubmit = async (data) => {
    const URL = `/api/ordertables`;
    const bodyContent = JSON.stringify({
      id: order.id,
      user: { id: order.user },
      dateCreated: order.dateCreated,
      addressDelivery: order.addressDelivery,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      paid: data.paid,
      status: data.status,
      orderDetails: order.orderDetails,
    });
    try {
      const response = await customFetchAuth(
        URL,
        "PUT",
        bodyContent,
        userContext
      );
      if (response.status === 200) {
        console.log("success");
        console.log(response);
      }
      history.push("/admin/orders");
      console.log(bodyContent);
    } catch (error) {
      console.log(error);
    }
    openNotification("center");
  };
  //get payment method
  const getPaymentMethod = (p) => {
    if (p === 0) return "Pay after receiving";
    if (p === 1) return "Payment via MoMo wallet";
    if (p === 2) return "Payment via ZaloPay";
    if (p === 3) return "Payment via Paypal";
  };

  const h3style = {
    textTransform: "uppercase",
    padding: "15px",
    fontSize: "20px",
    textAlign: "center",
    backgroundColor: "#bfdeff",
  };
  const mainStyle = {
    backgroundColor: "while",
  };

  return (
    <div id="main-content">
      <div className="main_container" style={mainStyle}>
        <span className="admin_form_title">Cập nhật đơn hàng</span>
        <form className="form_update_order" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 row">
            <label
              htmlFor="orderID"
              className="col-sm-4 col-form-label obligate"
            >
              Mã ĐH:
            </label>
            <div className="col-sm-8">
              <input
                {...register("orderID")}
                id="orderID"
                className="form-control"
                disabled
                defaultValue={order?.id}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="username"
              className="col-sm-4 col-form-label obligate"
            >
              Tên khách hàng:
            </label>
            <div className="col-sm-8">
              <input
                {...register("username")}
                id="username"
                className="form-control"
                disabled
                defaultValue={getUserByID(order?.user)?.username}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="daterelease"
              className="col-sm-4 col-form-label obligate"
            >
              Ngày ĐH:
            </label>
            <div className="col-sm-8">
              <input
                {...register("daterelease")}
                id="daterelease"
                className="form-control"
                disabled
                defaultValue={order?.dateCreated}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="address"
              className="col-sm-4 col-form-label obligate"
            >
              Địa chỉ GH:
            </label>
            <div className="col-sm-8">
              <input
                {...register("address")}
                id="address"
                className="form-control"
                disabled
                defaultValue={order?.addressDelivery}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="totalprice"
              className="col-sm-4 col-form-label obligate"
            >
              Tổng giá:
            </label>
            <div className="col-sm-8">
              <input
                {...register("totalprice")}
                id="totalprice"
                className="form-control"
                disabled
                defaultValue={order?.totalPrice + "đ"}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="paymentmethod"
              className="col-sm-4 col-form-label obligate"
            >
              Phương thức TT:
            </label>
            <div className="col-sm-8">
              <input
                {...register("paymentmethod")}
                id="paymentmethod"
                className="form-control"
                disabled
                defaultValue={getPaymentMethod(order?.paymentMethod)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="paid" className="col-sm-4 col-form-label obligate">
              Thanh toán:
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                {...register("paid")}
                defaultValue={order?.paid}
              >
                <option value="0">Chưa thanh toán</option>
                <option value="1">Đã thanh toán</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="status"
              className="col-sm-4 col-form-label obligate"
            >
              Trạng thái:
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                {...register("status")}
                defaultValue={order?.status}
              >
                <option value="1">Đợi xác nhận</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã giao</option>
                <option value="4">Hủy đơn</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminUpdateContext;
