import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state === null) {
    navigate("/Cart");
  } else {
  }
  const { cartItems, totalPrice, taxAmount, totalPriceWithTax } =
    location.state;
  return (
    <>
      {/* Header section */}
      <Header />

      {/* Confirmation content */}
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 ">
            <div className="card conform-card">
              <div className="card-body">
                <h5 className="card-title text-center">Order Confirmation</h5>
                <p className="card-text text-center">
                  Thank you for your order!
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-center">Purchased Products</h6>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item._id}>
                            <td>{item.Product_name}</td>
                            <td>${item.Product_price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              ${(item.quantity * item.Product_price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                <div className="text-center">
                  <p>Total: ${totalPrice.toFixed(2)}</p>
                  <p>Tax: ${taxAmount.toFixed(2)}</p>
                  <p>Total Price with Tax: ${totalPriceWithTax.toFixed(2)}</p>
                </div>
                <div className="text-center mt-3">
                  <Link to="/" className="submit-button">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationPage;
