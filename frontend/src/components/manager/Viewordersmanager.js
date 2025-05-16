import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import { DELETE_ORDER_BY_ID } from "../../graphql/DeleteOrderById";
import { UPDATE_ORDER_BY_ID } from "../../graphql/UpdateOrderStatus";
import Header from "./Header";

function Viewordersmanager() {
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const { loading, error, data } = useQuery(FETCH_All_ORDERS);
  const [deleteOrder] = useMutation(DELETE_ORDER_BY_ID);
  const [updateOrder, { loading1, error1, data1 }] =
    useMutation(UPDATE_ORDER_BY_ID);
  /* const handleSubmit = (orderId) => {
    updateOrder({
      variables: {
        orderId: orderId,
        updatedData: {
          Status: "Ready",
        },
      },
      refetchQueries: [{ query: FETCH_All_ORDERS }],
    });

    //navigate("/Viewcategory");

    alert("Order Status Updated Successfully");
  };*/

  const handleCancelOrder = (orderId) => {
    deleteOrder({
      variables: {
        orderId: orderId,
      },
      refetchQueries: [{ query: FETCH_All_ORDERS }],
    });

    alert("Order Cancelled Successfully");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getAllOrder_db) {
    console.error("No data or empty data returned for categories.");
    return null;
  }

  return (
    <>
      <div className="container">
        <Header />
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
                    <td>Delivery Type</td>

                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data.getAllOrder_db
                    .filter((order) => {
                      // Include your filter condition here
                      // For example, filter orders with a status of "Pending"
                      console.log("Order Status:", order.Status);
                      return order.Status !== "Ready";
                    })
                    .map((order, index) => (
                      <tr key={index}>
                        <td>
                          {" "}
                          {order.CustomerFirstname}
                          {order.CustomerLastname}
                        </td>
                        <td>
                          {order.orderItems.map((item) => (
                            <div key={item.product_name}>
                              <div>{item.product_name}</div>
                              <div>Price: ${item.product_price}</div>
                            </div>
                          ))}
                        </td>
                        <td>{order.orderItems[0].Quantity}</td>
                        <td>${order.TotalPriceWithTax}</td>
                        <td>{formatDate(order.Date)}</td>
                        <td>{order.Time}</td>
                        <td>{formatDate(order.CurrentDate)}</td>
                        <td>{order.DeliveryType}</td>
                        {/*<td>
                          <button
                            onClick={() => handleSubmit(order._id)}
                            type="button"
                            className="btn btn-primary"
                          >
                            Ready
                          </button>
                      </td> */}
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Cancel
                          </button>
                        </td>
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

export default Viewordersmanager;
