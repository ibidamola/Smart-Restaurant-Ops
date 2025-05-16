import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const cartItemsString = localStorage.getItem("cartItems");
  const cartItems = JSON.parse(cartItemsString) || [];
  const CustomerloginData = localStorage.getItem("CustomerloginData");
  // Calculate total quantity of products in the cart
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header>
      <a href="#" class="nav-logo">
        <i class="fas fa-utensils"></i>EatToast
      </a>
      <div id="menu-button" class="fas fa-bars"></div>
      <nav class="navbar">
        <a href="/Index">Home</a>
        <a href="/Menu">Menu</a>
        <a href="/Table">Reservation</a>

        <a href="/Review">Review</a>

        {CustomerloginData ? (
          <>
            <a href="/Order">Order</a>
            <a href="/Profile">Profile</a>
            <a href="/UserLogout">Logout</a>
          </>
        ) : (
          <>
            <a href="/UserLogin">Login</a>
            <a href="/UserSignup">Signup</a>
          </>
        )}

        <a href="/Cart">
          <i class="fas fa-shopping-cart">
            <span className="cart-length">
              {totalQuantity > 0 && `(${totalQuantity})`}
            </span>
          </i>{" "}
        </a>
      </nav>
    </header>
  );
}

export default Header;
