import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// context
import {UserSessionContext} from "../../context/UserSessionContext";
import { ProductContext } from "../../context/ProductContext";
//import util
import { customFetch } from "../util/customFetch";
import { Bar } from "react-chartjs-2";
import { date } from "yup";
//import component
import {ExportCSVFile} from "./ExportCSVFile"

const AdminHome = () => {
  const {userSessionContextValue1, userSessionContextValue2} = useContext(UserSessionContext);
  const [users, setUsers] = userSessionContextValue1;
  const [products, setProducts] = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const URL = "/api/ordertables";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sold = orders?.filter((o)=>{
    return o.status == 3;
  });
  const ordering = orders?.filter((o)=>{
    return o.status != 3;
  });
  const userCount = Object.keys(users).length;
  const productCount = Object.keys(products).length;
  const soldCount = Object.keys(sold).length;
  const orderingCount = Object.keys(ordering).length;

  //revenue 

  function getMonth(date){
    const dates = ""+date;
    const month = dates.split("-");
    return month[1];
  }

  function getlistOrderInMonth(){
    const date = new Date();
    const order = orders.filter(o=>{
      return Number(getMonth(o.dateCreated)) == Number(date.getMonth()+1) && o.status == 3;
    });
    return order;
  }

  function getRevenueInMonth(month){
    const order = orders.filter(o=>{
      return Number(getMonth(o.dateCreated)) == month && o.status == 3;
    });
    let sum=0;
    const revenue = order.map(o=>{
      sum+= o.totalPrice;
    });
    return sum;
  }

  const style={
    backgroundColor:"white"
  }
  const clr_block_1={
    backgroundColor:"#fc3158",
  }
  const clr_block_2={
    backgroundColor:"#53d769",
  }
  const clr_block_3={
    backgroundColor:"#147efb",
  }
  const clr_block_4={
    backgroundColor:"#e0b20a",
  }
  
  return (
    <div id="main-content" style={style}>
     <div className="market-updates">
        <div className="col-md-3 market-update-gd">
          <div className="market-update-block clr-block-1" style={clr_block_1}>
            <div className="col-md-4 market-update-right">
              <i className="fa fa-users"> </i>
            </div>
            <div className="col-md-8 market-update-left">
              <h4>Người dùng</h4>
              <h3>{userCount}</h3>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="col-md-3 market-update-gd">
          <div className="market-update-block clr-block-2" style={clr_block_2}>
            <div className="col-md-4 market-update-right">
              <i className="fa fa-usd"> </i>
            </div>
            <div className="col-md-8 market-update-left">
              <h4>Bán hàng</h4>
              <h3>{soldCount}</h3>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="col-md-3 market-update-gd">
          <div className="market-update-block clr-block-3" style={clr_block_3}>
            <div className="col-md-4 market-update-right">
              <i className="fa fa-shopping-cart"> </i>
            </div>
            <div className="col-md-8 market-update-left">
              <h4>Đơn đặt hàng</h4>
              <h3>{orderingCount}</h3>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="col-md-3 market-update-gd">
          <div className="market-update-block clr-block-4" style={clr_block_4}>
            <div className="col-md-4 market-update-right">
              <i className="fa fa-product-hunt"> </i>
            </div>
            <div className="col-md-8 market-update-left">
              <h4>Sản phẩm</h4>
              <h3>{productCount}</h3>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
      <div className="charts">
        <div className="revenue-charts">
        <ExportCSVFile csvData={getlistOrderInMonth()} fileName="Revevation.csv"/>
          <Bar
            data={{
              labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
              datasets: [
                {
                  label: "Doanh thu(vnđ)",
                  backgroundColor: [
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                    "#3e95cd",
                  ],
                  data: [getRevenueInMonth(1), getRevenueInMonth(2), getRevenueInMonth(3), getRevenueInMonth(4),
                    getRevenueInMonth(5), getRevenueInMonth(6), getRevenueInMonth(7), getRevenueInMonth(8),
                    getRevenueInMonth(9), getRevenueInMonth(10), getRevenueInMonth(11), getRevenueInMonth(12)]
                }
              ]
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Biểu đồ doanh thu từng tháng trong năm"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
