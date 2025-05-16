import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import { DELETE_ORDER_BY_ID } from "../../graphql/DeleteOrderById";
import Header from "./Header";

function Viewordersmanager() {
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
  const [itemsPerPage] = useState(10); // Number of items per page

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const { loading, error, data } = useQuery(FETCH_All_ORDERS);
  const [deleteOrder] = useMutation(DELETE_ORDER_BY_ID);

  const handleCancelOrder = (orderId) => {
    deleteOrder({
      variables: {
        orderId: orderId,
      },
      refetchQueries: [{ query: FETCH_All_ORDERS }],
    });
    alert("Order Cancelled Successfully");
  };

  // Logic to calculate total number of pages
  const totalPages = Math.ceil(
    (data?.getAllOrder_db?.filter((order) => order.Status !== "Ready")
      ?.length || 0) / itemsPerPage
  );

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data?.getAllOrder_db
      ?.filter((order) => order.Status !== "Ready")
      ?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
                  {currentItems.map((order, index) => (
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
              {/* Pagination */}
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

export default Viewordersmanager;
