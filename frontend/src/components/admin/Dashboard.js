import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import { FETCH_All_CUSTOMERS } from "../../graphql/FetchAllCustomers";

import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const { loading, error, data: custData } = useQuery(FETCH_All_CUSTOMERS);
  const {
    loading: ordersLoading,
    error: ordersError,
    data: ordersData,
  } = useQuery(FETCH_All_ORDERS);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalCustomers, setTotalCustomers] = useState(0);

  // Pagination logic
  const totalPages = Math.ceil(totalCustomers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCustomers = custData?.getAllCustomers_db?.slice(
    startIndex,
    endIndex
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // State to hold the total number of customers

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPriceWithTaxSum, setTotalPriceWithTaxSum] = useState(0);

  useEffect(() => {
    if (custData && custData.getAllCustomers_db) {
      setTotalCustomers(custData.getAllCustomers_db.length);
      console.log(custData.getAllCustomers_db);
    }
  }, [custData]);
  useEffect(() => {
    if (ordersData && ordersData.getAllOrder_db) {
      setTotalOrders(ordersData.getAllOrder_db.length);
    }
  }, [ordersData]);

  useEffect(() => {
    if (ordersData && ordersData.getAllOrders_db) {
      setTotalOrders(ordersData.getAllOrders_db.length);

      let totalAmount = 0; // Initialize totalAmount outside the loop
      ordersData.getAllOrder_db.forEach((order) => {
        totalAmount += order.TotalPriceWithTax;
      });
      setTotalPriceWithTaxSum(totalAmount);
    }
  }, [ordersData]);

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
                  <div class="numbers">{totalCustomers}</div>
                  <div class="dashboxName">Customer</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>

              <div class="card">
                <div>
                  <div class="numbers">{totalOrders}</div>
                  <div class="dashboxName">Order</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="cart"></ion-icon>
                </div>
              </div>

              {/* <div class="card">
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
                  <div class="numbers">{totalPriceWithTaxSum}</div>
                  <div class="dashboxName">Earning</div>
                </div>

                <div class="dashboxicon">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
              </div> */}
            </div>

            <div class="details">
              <div class="latestOrder">
                <div class="cardHeader">
                  <h2>Recent Customer</h2>
                  {/* <a href="#" class="btn btn-primary">
                    View All
                  </a> */}
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
                    {paginatedCustomers &&
                      paginatedCustomers.map((customers) => (
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
                <div className="pagination">
                  <button
                    class="btn btn-primary"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="currentPage">{currentPage}</span>
                  <button
                    class="btn btn-primary"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
