import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Headermanager() {
  const navigate = useNavigate();
  // Check if loginData exists in localStorage
  const loginData = localStorage.getItem("loginData");
  console.log("Login Data= " + loginData);
  useEffect(() => {
    // Define the logout function
    if (!loginData && loginData == null) {
      navigate("/Login");
      //alert(`Please Login First`);
    }
  }, []);

  const [showOrdersSubMenu, setShowOrdersSubMenu] = useState(false);

  const handleManageOrdersClick = (event) => {
    event.preventDefault();
    setShowOrdersSubMenu(!showOrdersSubMenu);
  };
  return (
    <>
      <div class="admin-navigation">
        <ul>
          <li>
            <a href="#">
              <span class="title">EatToast</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span class="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span class="title">
                <a href="/Dashboardmanager">Dashboard</a>
              </span>
            </a>
          </li>

          <li className="manage-orders">
            <a href="#" onClick={handleManageOrdersClick}>
              <span className="icon">
                <ion-icon name="cart-outline"></ion-icon>
              </span>
              <span className="title">Manage Orders</span>
            </a>
          </li>
          {showOrdersSubMenu && (
            <>
              <ul>
                <li>
                  <a href="/Viewordersmanager">
                    {" "}
                    <span className="title">View Order</span>
                  </a>
                </li>
              </ul>
            </>
          )}

          {showOrdersSubMenu && (
            <>
              <ul>
                <li>
                  <a href="/Completeordersmanager">
                    {" "}
                    <span className="title">Completed Order</span>
                  </a>
                </li>
              </ul>
            </>
          )}

          {showOrdersSubMenu && (
            <>
              <ul>
                <li>
                  <a href="/DailyEarningsPage">
                    {" "}
                    <span className="title">Daily Earning</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Headermanager;
