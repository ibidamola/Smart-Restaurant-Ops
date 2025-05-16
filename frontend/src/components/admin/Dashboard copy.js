import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_All_CUSTOMERS_fromBD } from "../../graphql/FetchAllCustomers";
function Dashboard() {
  const navigate = useNavigate();
  const {
    loading: queryLoading,
    data: CustomerData,
    error: queryError,
  } = useQuery(FETCH_All_CUSTOMERS_fromBD);
  // Check if loginData exists in localStorage
  const loginData = localStorage.getItem("loginData");
  console.log("Login Data= " + loginData);

  return (
    <>
      <body>
        {/* admin-navigation start here */}
        <div class="admin-container">
          <Header />

          <div class="main">
            <div class="dashbox">
              <div class="card">
                <div>
                  <div class="numbers">1,504</div>
                  <div class="dashboxName">Customer</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>

              <div class="card">
                <div>
                  <div class="numbers">80</div>
                  <div class="dashboxName">Order</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="cart"></ion-icon>
                </div>
              </div>

              <div class="card">
                <div>
                  <div class="numbers">8</div>
                  <div class="dashboxName">Employee</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>

              <div class="card">
                <div>
                  <div class="numbers">$7,842</div>
                  <div class="dashboxName">Earning</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
              </div>
            </div>

            <div class="details">
              <div class="latestOrder">
                <div class="cardHeader">
                  <h2>Recent Customer</h2>
                  <a href="#" class="btn btn-primary">
                    View All
                  </a>
                </div>

                <table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Phone</td>
                    </tr>
                  </thead>

                  <tbody>
                    {CustomerData &&
                      CustomerData.getAllCustomers_db &&
                      CustomerData.getAllCustomers_db.map((customers) => (
                        <tr key={customers._id}>
                          <td>
                            {customers.Firstname} {customers.Lastname}
                          </td>

                          <td>{customers.email}</td>
                          <td>{customers.Mobile}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
