import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
function DailyEarningsPage() {
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
  const [dailyDetails, setDailyDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const { loading, error, data } = useQuery(FETCH_All_ORDERS);

  useEffect(() => {
    if (!loading && data && data.getAllOrder_db) {
      const details = {};
      data.getAllOrder_db.forEach((order) => {
        const date = formatDate(order.CurrentDate);
        if (!details[date]) {
          details[date] = { earnings: 0, ordersCount: 0 };
        }
        details[date].earnings += order.TotalPriceWithTax;
        details[date].ordersCount++;
      });
      setDailyDetails(Object.entries(details));
    }
  }, [loading, data]);
  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dailyDetails.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <Header />
      <div className="main">
        <div className="details">
          <div className="latestOrder">
            <div className="cardHeader">
              <h2>Daily Earning and Orders</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Earnings</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(([date, detail]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>${detail.earnings.toFixed(2)}</td>
                    <td>{detail.ordersCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                class="btn btn-primary"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="currentPage">{currentPage}</span>
              <button
                class="btn btn-primary"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentItems.length < itemsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyEarningsPage;
