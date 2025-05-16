import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import { Link } from "react-router-dom";
import Header from "./Header";
function Cart() {
  const navigate = useNavigate();
  const cartItemsString = localStorage.getItem("cartItems");
  //const [cartItem, setCartItems] = useState([]);
  const cartItems = JSON.parse(cartItemsString) || []; // Parse the string into an array, or default to an empty array if cartItemsString is null or cannot be parsed
  const [cartItem, setCartItems] = useState(cartItems);
  const [totalPriceNew, setTotalPrice] = useState(0);
  const taxRate = 0.13;

  let finalPrice = 0;
  let totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.Product_price,
    0
  );
  // const [subTotalPriceNew, setSubTotalPrice] = useState(totalPrice + 18.25);
  // //setSubTotalPrice(totalPrice * 18.25);
  // finalPrice = subTotalPriceNew;
  const handleAddProduct = (Product) => {
    const ProductExist = cartItem.find((item) => item._id === Product._id);

    if (ProductExist) {
      setCartItems(
        cartItem.map((item) =>
          item._id === Product._id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItem, { ...Product, quantity: 1 }]);
      //cartItems = cartItem;
    }
  };
  const handleRemoveProduct = (Product) => {
    const ProductExist = cartItem.find((item) => item._id === Product._id);

    if (ProductExist.quantity === 1) {
      setCartItems(cartItem.filter((item) => item._id !== Product._id));
    } else {
      setCartItems(
        cartItem.map((item) =>
          item._id === Product._id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );

      //cartItems = cartItem;
    }
  };
  const handleRemoveProductfromCart = (productId) => {
    setCartItems(cartItem.filter((item) => item._id !== productId));
  };
  useEffect(() => {
    const newTotalPrice = cartItem.reduce(
      (price, item) => price + item.quantity * item.Product_price,
      0
    );
    setTotalPrice(newTotalPrice);
    totalPrice = totalPriceNew;
    // setSubTotalPrice(totalPrice * 18.25);
    // finalPrice = subTotalPriceNew;
  }, [cartItem]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);
  const subTotalPrice = totalPriceNew;
  const taxAmount = subTotalPrice * taxRate;
  const totalPriceWithTax = subTotalPrice + taxAmount;
  console.log("cartItem_updated" + JSON.stringify(cartItem));
  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      <div class="container-fluid text-center">
        <div class="cart-container ">
          <p class="cart-head">YOUR SHOPPING CART</p>
          <table class="mx-auto" width="100%">
            <thead>
              <tr>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td> <td>Remove</td>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <img src="/img/pancake.jpg"></img>
                  </td>

                  <td>
                    <h5>{item.Product_name}</h5>
                  </td>

                  <td>
                    <h5>{item.Product_price}</h5>
                  </td>

                  <td>
                    {" "}
                    <input
                      class="w-25 pl-1"
                      type="number"
                      value={item.quantity}
                      min="1"
                    ></input>
                    <button
                      class="increase"
                      onClick={() => handleAddProduct(item)}
                    >
                      +
                    </button>
                    <button
                      class="decrease"
                      onClick={() => handleRemoveProduct(item)}
                    >
                      -
                    </button>
                  </td>

                  <td>
                    <h5>
                      {" "}
                      <h5>${item.quantity * item.Product_price}</h5>
                    </h5>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveProductfromCart(item._id)}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div class="cart-bottom">
        <div class="row">
          <div class="coupon col-lg-5 col-md-5 col-12 mx-3" mb-4>
            <div>
              <h5>COUPON</h5>

              <p>Enter Your Coupon name if you have one.</p>

              <input type="text" placeholder="coupon code"></input>
              <button>APPLY COUPON</button>
            </div>
          </div>

          <div class="total col-lg-6 col-md-6 col-12" mb-4>
            <div>
              <h5>CART TOTAL</h5>

              <div class="d-flex justify-content-between">
                <h6>Subtotal</h6>
                <p>${totalPrice}</p>
              </div>

              <div class="d-flex justify-content-between">
                <h6>Tax</h6>
                <p>${taxAmount.toFixed(2)}</p>
              </div>

              <hr className="second-hr"></hr>

              <div class="d-flex justify-content-between">
                <h6>Total</h6>
                <p>${totalPriceWithTax.toFixed(2)}</p>
              </div>

              <div class="d-flex justify-content-between">
                <h6></h6>
                <p>
                  <button class="ml-auto">PROCESS</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
