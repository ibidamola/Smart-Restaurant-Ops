import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_All_ORDERS } from "../../graphql/FetchAllOrders";
import Header from "./Headermanager";

function DailyEarningsPage() {
  const [dailyDetails, setDailyDetails] = useState([]);

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
                {dailyDetails.map(([date, detail]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>${detail.earnings.toFixed(2)}</td>
                    <td>{detail.ordersCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyEarningsPage;
