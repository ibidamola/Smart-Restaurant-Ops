import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import Header from "./Headermanager";

function Completeordersmanager() {
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const { loading, error, data } = useQuery(FETCH_All_ORDERS);

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
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 mx-1">
                <div className="input-group mx-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <button className="btn btn-primary" type="button">
                    Search
                  </button>
                </div>
              </div>
              <div className="col-md-5 ">
                <div className="input-group mb-3">
                  <label className="input-group-text">Filter</label>
                  <select className="form-select">
                    <option selected>Choose...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
                    <td>
                      Action
                    </td>
                    <td>
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {data.getAllOrder_db.map((order, index) => (
                    <tr key={index}>
                      <td>
                        {index === 0 ||
                          data.getAllOrder_db[index - 1].CustomerFirstname !==
                          order.CustomerFirstname ||
                          data.getAllOrder_db[index - 1].CustomerLastname !==
                          order.CustomerLastname
                          ? `${order.CustomerFirstname} ${order.CustomerLastname}`
                          : null}
                      </td>
                      <td>
                        {order.Product_name} 
                      </td>
                      <td>{order.Quantity}</td>
                      <td>{order.TotalPriceWithTax}</td>
                      <td>{formatDate(order.Date)}</td>
                      <td>{order.Time}</td>
                      <td>{formatDate(order.CurrentDate)}</td>
                      <td><button type="button" class="btn btn-primary">Ready</button></td>
                      <td><button type="button" class="btn btn-danger">Cancel</button></td>
                          
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

export default Completeordersmanager;
