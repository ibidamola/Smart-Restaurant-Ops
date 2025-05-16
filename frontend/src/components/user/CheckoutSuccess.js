import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Header from "./Header";
const MUTATION_PAYCHECKOUT = gql`
  mutation Mutation($order: [OrderInput!]) {
    cCheckoutSession(order: $order)
  }
`;

function CheckoutSuccess({ clearCart, cartItems, customer }) {
  console.log(cartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const isSuccess = queryParams.get("success") === "true";
  //const {cartItems, customer} = location.state || [];

  const [startCheckout] = useMutation(MUTATION_PAYCHECKOUT);

  console.log(customer);
  /*useEffect(() => {
    if (isSuccess) {
      startCheckout({
        variables: {
          order: cartItems.map(item => ({
            Product_name: item.Product_name,
            Product_price: item.Product_price,
            Quantity: item.quantity,
            CustomerFirstname: customer.Firstname,
            CustomerLastname: customer.Lastname,
            CustomerMobile: customer.Mobile,
            DeliveryType: customer.DeliveryType,
            PaymentBy: customer.PaymentBy,
            CustomerId: customer.CustomerId,
            Date: customer.Date,
            Time: customer.Time,
          })),
        },
      })
        .then(data => {
          // Handle successful response (optional)
          console.log('Order saved:', data);
        })
        .catch(error => {
          // Handle error (optional)
          console.error('Error saving order:', error);
        })
        .finally(() => {
          // Clear cart items from local storage
          localStorage.removeItem('cartItems');
        });
    } 
  }, [isSuccess, startCheckout]);*/

  useEffect(() => {
    if (isSuccess && Array.isArray(cartItems)) {
      startCheckout({
        variables: {
          order: cartItems.map((item) => ({
            Product_name: item.Product_name,
            Product_price: item.Product_price,
            Quantity: item.quantity,
            CustomerFirstname: customer.Firstname,
            CustomerLastname: customer.Lastname,
            CustomerMobile: customer.Mobile,
            DeliveryType: customer.DeliveryType,
            PaymentBy: customer.PaymentBy,
            CustomerId: customer.CustomerId,
            Date: customer.Date,
            Time: customer.Time,
          })),
        },
      })
        .then((data) => {
          console.log("Order saved:", data);
          clearCart(); // Clear cart after successful checkout
        })
        .catch((error) => {
          console.error("Error saving order:", error);
        });
    }
  }, [isSuccess, startCheckout, cartItems, customer, clearCart]);

  const handleNavigation = (event) => {
    // Prevent the default navigation behavior
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    // Check if Stripe redirected with success URL
    if (location.pathname === "/CheckoutSuccess") {
      // Clear the cart here
      localStorage.removeItem("cartItems");
    }
  }, [location, clearCart]);

  useEffect(() => {
    console.log(cartItems);
    // Clear the cart if cartItems are available
    if (cartItems) {
      console.log(cartItems);
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  useEffect(() => {
    // Add event listeners for navigation events
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("pushstate", handleNavigation);
    window.addEventListener("beforeunload", handleNavigation);

    // Replace the current history entry with a new one
    window.history.replaceState(null, "", location.pathname);

    // Prevent the browser from navigating back or forward
    window.onpopstate = () => window.history.go(0);

    // Redirect the user to the menu page
    //const timeoutId = setTimeout(() => {
    //navigate('/Menu', { replace: true });
    //}, 800000);

    // Remove event listeners on component unmount
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("pushstate", handleNavigation);
      window.removeEventListener("beforeunload", handleNavigation);
      window.history.replaceState(null, "", "");
      //clearTimeout(timeoutId);
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 ">
            <div className="card conform-card">
              <div className="card-body">
                <h5 className="card-title text-center">CheckoutSuccess</h5>
                <p className="card-text text-center">
                  <button class="Success-button mt-3">
                    <a href="/Menu">Menu Page</a>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutSuccess;
