import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import { FETCH_ALL_ORDERS_BY_CUSTOMER } from "../../graphql/FetchAllOrdersByCustomer";
import Header from "./Header";

function Order() {
  const navigate = useNavigate();
  // Check if loginData exists in localStorage
  const customerId = localStorage.getItem("CustomerloginData");
  console.log("Login id= " + customerId);
  useEffect(() => {
    // Define the logout function
    if (!customerId && customerId == null) {
      navigate("/UserLogin");
      //alert(`Please Login First`);
    }
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  //const { loading, error, data } = useMutation(FETCH_ALL_ORDERS_BY_CUSTOMER);
  const { loading, error, data } = useQuery(FETCH_ALL_ORDERS_BY_CUSTOMER, {
    variables: {
      customerId: customerId,
    },
  });

  if (!data || !data.getOrderByCusomerId_db) {
    // console.log("data.getOrderByCusomerId_db=" + data.getOrderByCusomerId_db);
    //console.error("No data or empty data returned for orders.");
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="main">
          <div className="details">
            <div className="latestOrder">
              <div className="cardHeader">
                <h2>Recent Orders</h2>
              </div>

              <table>
                <thead>
                  <tr>
                    <td>Customer Name</td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Total Price With Tax</td>
                    <td>Pickup Date</td>
                    <td>Pickup Time</td>
                    <td>Order Date</td>
                  </tr>
                </thead>

                <tbody>
                  {data?.getOrderByCusomerId_db.map((order) => (
                    <tr key={order._id}>
                      <td>
                        {" "}
                        {order.CustomerFirstname}
                        {order.CustomerLastname}
                      </td>
                      <td>
                        {order.orderItems.map((item) => (
                          <div key={item.product_name}>
                            {item.product_name} (${item.product_price})
                          </div>
                        ))}
                      </td>
                      <td>{order.orderItems.reduce((acc, item) => acc + item.Quantity, 0)}</td>
                     
                      <td>{order.TotalPriceWithTax}</td>
                      <td>{formatDate(order.Date)}</td>
                      <td>{order.Time}</td>
                      <td>{formatDate(order.CurrentDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
