import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  // Check if loginData exists in localStorage
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const loginDataString = localStorage.getItem("loginData");
    const parsedLoginData = loginDataString
      ? JSON.parse(loginDataString)
      : null;
    setLoginData(parsedLoginData);
  }, []);
  const [showCategorySubMenu, setShowCategorySubMenu] = useState(false);
  const [showItemsSubMenu, setShowItemsSubMenu] = useState(false);
  const [showOrdersSubMenu, setShowOrdersSubMenu] = useState(false);
  const [showOrdersSubMenuformanager, setShowOrdersSubMenuformanager] =
    useState(false);
  const handleManageCategoryClick = (event) => {
    event.preventDefault();
    setShowCategorySubMenu(!showCategorySubMenu);
  };

  const handleManageItemsClick = (event) => {
    event.preventDefault();
    setShowItemsSubMenu(!showItemsSubMenu);
  };
  const handleManageOrdersClick = (event) => {
    event.preventDefault();
    setShowOrdersSubMenu(!showOrdersSubMenu);
  };
  const handleManageOrdersformanagerClick = (event) => {
    event.preventDefault();
    setShowOrdersSubMenuformanager(!showOrdersSubMenuformanager);
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
                <a href="/Dashboard">Dashboard</a>
              </span>
            </a>
          </li>
          {loginData && (
            <>
              {loginData.checkExistingUser.Usertype !== "MANAGER" && (
                <>
                  <li className="manage-category">
                    <a href="#" onClick={handleManageCategoryClick}>
                      <span className="icon">
                        <ion-icon name="fast-food-outline"></ion-icon>
                      </span>
                      <span className="title">Manage Category</span>
                    </a>
                  </li>
                  {showCategorySubMenu && (
                    <>
                      <ul>
                        <li>
                          <a href="/Addcategory">
                            <span className="title">Add Category</span>
                          </a>
                        </li>
                        <li>
                          <a href="/Viewcategory">
                            <span className="title">View Category</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                  <li className="manage-items">
                    <a href="#" onClick={handleManageItemsClick}>
                      <span className="icon">
                        <ion-icon name="restaurant"></ion-icon>
                      </span>
                      <span className="title">Manage Items</span>
                    </a>
                  </li>
                  {showItemsSubMenu && (
                    <>
                      <ul>
                        <li>
                          <a href="/Additems">
                            <span className="title">Add Items</span>
                          </a>
                        </li>
                        <li>
                          <a href="/Viewproduct">
                            <span className="title">View Product</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  )}

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
                          <a href="/Vieworders">
                            {" "}
                            <span className="title">View Order</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  )}
                </>
              )}
              {loginData.checkExistingUser.Usertype !== "ADMIN" && (
                <>
                  <li className="manage-orders">
                    <a href="#" onClick={handleManageOrdersformanagerClick}>
                      <span className="icon">
                        <ion-icon name="cart-outline"></ion-icon>
                      </span>
                      <span className="title">Manage Orders</span>
                    </a>
                  </li>
                  {showOrdersSubMenuformanager && (
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

                  {/* {showOrdersSubMenuformanager && (
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
                  )} */}

                  {showOrdersSubMenuformanager && (
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
                  <li>
                    <a href="#">
                      <span class="icon">
                        <ion-icon name="book"></ion-icon>
                      </span>
                      <span class="title">
                        <a href="/Tableselection">Table Bookings</a>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon">
                        <ion-icon name="book"></ion-icon>
                      </span>
                      <span class="title">
                        <a href="/AddCoupon">Add Coupon</a>
                      </span>
                    </a>
                  </li>
                </>
              )}
              <li>
                <a href="#">
                  <span class="icon">
                    <ion-icon name="exit-outline"></ion-icon>
                  </span>
                  <span class="title">
                    <a href="/Logout">Logout</a>
                  </span>
                </a>
              </li>
            </>
          )}
          {!loginData && (
            <>
              <li>
                <a href="#">
                  <span class="icon">
                    <ion-icon name="exit-outline"></ion-icon>
                  </span>
                  <span class="title">
                    <a href="/Registration">Register Here</a>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon">
                    <ion-icon name="exit-outline"></ion-icon>
                  </span>
                  <span class="title">
                    <a href="/Login">Login</a>
                  </span>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
