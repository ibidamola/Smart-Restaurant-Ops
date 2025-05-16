import React, { useEffect, useState } from "react";
import Header from "./Headermanager";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
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
                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>

                    <tr>
                      <td>Prince</td>
                      <td>p@gmail.com</td>
                      <td>1212121212</td>
                    </tr>
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
