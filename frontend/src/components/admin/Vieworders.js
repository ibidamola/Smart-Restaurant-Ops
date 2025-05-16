import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import Header from "./Header";
function Vieworders() {
  const navigate = useNavigate();
  const loginData = localStorage.getItem("loginData");
  console.log("Login Data= " + loginData);
  useEffect(() => {
    // Define the logout function
    if (!loginData && loginData == null) {
      navigate("/Login");
      //alert(`Please Login First`);
    }
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const { loading, error, data } = useQuery(FETCH_All_ORDERS);
  if (!data || !data.getAllOrder_db) {
    console.error("No data or empty data returned for categories.");
  }
  const setData = (cat) => {
    let { category_name, _id } = cat;
    console.log("ID" + _id);
    localStorage.setItem("id", _id);
    localStorage.setItem("category_name", category_name);
  };
  // Logic to calculate total number of pages
  const totalPages = Math.ceil(
    (data?.getAllOrder_db?.length || 0) / itemsPerPage
  );

  // Logic to get current orders based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = data?.getAllOrder_db?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <div className="container">
        <Header />

        <div className="main">
          {/* <div className="container mt-5">
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
          </div> */}
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

                    <td>Order Date</td>
                    {/* <td>Status</td> */}
                  </tr>
                </thead>

                <tbody>
                  {currentOrders?.map((order, index) => (
                    <tr key={index}>
                      <td>
                        {index === 0 ||
                        currentOrders[index - 1].CustomerFirstname !==
                          order.CustomerFirstname ||
                        currentOrders[index - 1].CustomerLastname !==
                          order.CustomerLastname
                          ? `${order.CustomerFirstname} ${order.CustomerLastname}`
                          : null}
                      </td>
                      <td>
                        {" "}
                        {order.orderItems.map((item) => (
                          <div key={item.product_name}>
                            <div>{item.product_name}</div>
                            <div>Price: ${item.product_price}</div>
                          </div>
                        ))}
                      </td>

                      {/* <td>
                        {order.orderItems.map((item) => {
                          const sum = item.Quantity > 1 ? item.Quantity : "";
                          return (
                            <div key={item.Quantity}>
                              <div>
                                {item.Quantity > 1 ? sum : item.Quantity}
                              </div>
                            </div>
                          );
                        })}
                      </td> */}
                      <td>{order.orderItems[0].Quantity}</td>
                      <td>{order.TotalPriceWithTax}</td>

                      <td>
                        {" "}
                        {new Date(order.CurrentDate).toISOString().slice(0, 10)}
                      </td>
                      {/* <td>{order.Status}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  className="btn btn-primary"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="currentPage">{currentPage}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vieworders;
