import React, { useContext } from "react";
// context
import { OrderTableContext } from "../context/OrderTableContext";
// component
import OrderTable from "../component/OrderTable";
import NavigateLink from "../component/NavigateLink";
// design
import "antd/dist/antd.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

// css
const tabStyle = {
  backgroundColor: "white",
  padding: "1rem",
};

const OrderTableList = () => {
  const { orderTableContextValue1, orderTableContextValue2 } =
    useContext(OrderTableContext);
  const [orderTables, setOrderTables] = orderTableContextValue1;

  const orderTablesWithStatus = function (code) {
    const orderTablesClone = [...orderTables];
    const getOrderTablesWithStatus = orderTablesClone.filter((o) => {
      return o.status === code;
    });
    return getOrderTablesWithStatus;
  };

  const orderTablesWithStatus1 = orderTablesWithStatus(1);
  const orderTablesWithStatus2 = orderTablesWithStatus(2);
  const orderTablesWithStatus3 = orderTablesWithStatus(3);
  const orderTablesWithStatus4 = orderTablesWithStatus(4);

  return (
    <div className="order_table_list_wrapper">
      <div className="order_table_list">
        <span className="order_table_list_header">
          <NavigateLink link1={"orderlist"} />
          <span>Order List</span>
        </span>
        <div className="content">
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            size="large"
            tabBarStyle={tabStyle}
          >
            <TabPane tab="All Order" key="1">
              {orderTables.map((orderTable) => (
                <OrderTable key={orderTable.id} orderTableProps={orderTable} />
              ))}
            </TabPane>
            <TabPane tab="On The Way" key="3">
              {orderTablesWithStatus2.map((orderTable) => (
                <OrderTable key={orderTable.id} orderTableProps={orderTable} />
              ))}
            </TabPane>
            <TabPane tab="Delivered" key="4">
              {orderTablesWithStatus3.map((orderTable) => (
                <OrderTable key={orderTable.id} orderTableProps={orderTable} />
              ))}
            </TabPane>
            <TabPane tab="Cancelled" key="5">
              {orderTablesWithStatus4.map((orderTable) => (
                <OrderTable key={orderTable.id} orderTableProps={orderTable} />
              ))}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrderTableList;
