import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_REGISTRATION_MUTATION } from "../../graphql/CustomerRegistrationMutation";
import { ADD_ORDER_MUTATION } from "../../graphql/AddOrderMutation";
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER_EXIST_QUERY } from "../../graphql/CheckExistingCustomer";
import moment from "moment";
import { Link } from "react-router-dom";
import Header from "./Header";
import Additems from "../admin/Additems";
function Checkout() {
  const navigate = useNavigate();
  let RegistrationId = 0;
  const cartItemsString = localStorage.getItem("cartItems");
  const cartItems = JSON.parse(cartItemsString) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const taxRate = 0.13;

  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [Mobile, setMobile] = useState("");
  const [Password, setPassword] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [DeliveryType, setDeliveryType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [Time, setTime] = useState("");
  const [PaymentBy, setPaymentBy] = useState("");
  const [CardHolderName, setCardHolderName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [ExDate, setExDate] = useState("");
  const [Cvv, setCvv] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [dataQ, { loading, errorQ }] = useMutation(CUSTOMER_EXIST_QUERY);
  // Function to format current date as yyyy-mm-dd
  const getCurrentDate = () => {
    return moment().format("YYYY-MM-DD");
  };

  useEffect(() => {
    // Set current date when component mounts
    setSelectedDate(getCurrentDate());
  }, []);
  const [registration, { error, data }] = useMutation(
    CUSTOMER_REGISTRATION_MUTATION
  );
  const [order, { error1, data1 }] = useMutation(ADD_ORDER_MUTATION);
  const validateForm = async () => {
    const errors = [];

    if (!Firstname) {
      errors.push("Firstname field is required");
    }
    if (!Lastname) {
      errors.push("Lastname field is required");
    }
    if (!email) {
      errors.push("Email field is required");
    }

    if (!Mobile) {
      errors.push("Mobile is required");
    }
    if (!Address1) {
      errors.push("Address1 is required");
    }
    if (!PostalCode) {
      errors.push("PostalCode is required");
    }
    if (!State) {
      errors.push("State is required");
    }
    if (!Country) {
      errors.push("Country is required");
    }
    if (!DeliveryType) {
      errors.push("Delivery Type Selection is required");
    }
    if (DeliveryType === "Pick up order") {
      if (!Date) {
        errors.push("Date for Pickup order is required");
      }
      if (!Time) {
        errors.push("Time for Pickup order is required");
      }
    }
    if (!PaymentBy) {
      errors.push("Payment Method is required");
    }
    if (PaymentBy === "Credit Card" || PaymentBy === "Debit Card") {
      if (!CardHolderName) {
        errors.push("Card Holder Name is required");
      }
      if (!CardNumber) {
        errors.push("Card Number is required");
      }
      if (!ExDate) {
        errors.push("Expiration Date is required");
      }
      if (!Cvv) {
        errors.push("CVV is required");
      }
    }
    setErrorMessages(errors);
    return errors.length === 0;
  };
  const handleDropdownStateChange = (e) => {
    setState(e.target.value);
  };
  const handleDropdownCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleDropdownDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
  };
  const handleDropdownPaymentByChange = (e) => {
    setPaymentBy(e.target.value);
  };
  const handleDropdownTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleDateChange = (e) => {
    const inputDate = e.target.value;

    // Regular expression to match YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if inputDate matches the expected format
    if (!dateRegex.test(inputDate)) {
      // Handle invalid input
      console.error("Invalid date format. Please use YYYY-MM-DD format.");
      return;
    }

    // Split the inputDate into year, month, and day components
    const [year, month, day] = inputDate.split("-");

    // Create a new Date object
    const localDate = new Date(year, month - 1, day);

    // Check if the parsed date is valid
    if (isNaN(localDate.getTime())) {
      // Handle invalid date
      console.error("Invalid date. Please provide a valid date.");
      return;
    }

    // Convert the local date to the local time zone string format
    const localDateString = localDate.toLocaleDateString("en-CA", {
      timeZone: "America/Toronto",
    });

    // Set the formatted date in the state
    setPickupDate(localDateString);
  };

  useEffect(() => {
    setPassword(Mobile);
  }, [Mobile]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check validation
    if (validateForm()) {
      //Check CUSTOMER EXIST result
      const CUSTOMER_EXIST = await dataQ({
        variables: { email: email },
      });
      console.log(
        "CUSTOMER_EXIST.data.checkExistingCustomerwithemailonly=" +
          CUSTOMER_EXIST.data.checkExistingCustomerwithemailonly,
        Firstname,
        parseInt(Mobile),
        Lastname,
        email,
        Password,
        Address1,
        Address2,
        PostalCode,
        State,
        Country
      );
      if (CUSTOMER_EXIST.data.checkExistingCustomerwithemailonly === null) {
        try {
          const registration_result = await registration({
            variables: {
              customerInput: {
                Firstname,
                Mobile: parseInt(Mobile),
                Lastname,
                email,
                Password,
                Address1,
                Address2,
                PostalCode,
                State,
                Country,
              },
            },
          });

          if (
            registration_result.data &&
            registration_result.data.signupCustomer
          ) {
            RegistrationId = registration_result.data.signupCustomer._id;
            console.log(
              "RegistrationId in registation = " +
                registration_result.data.signupCustomer._id
            );
          }
        } catch (error) {
          // Check if the error message is related to an existing user
          if (
            error.message.includes(
              "User with the provided email and usertype already exists."
            )
          ) {
            setErrorMessages([
              `User with the provided email and usertype already exists. will you like to login? `,
            ]);
          }
          return;
        }
        console.log("in if RegistrationId= " + RegistrationId);
      } else {
        RegistrationId =
          CUSTOMER_EXIST.data.checkExistingCustomerwithemailonly._id;
        console.log("in else RegistrationId= " + RegistrationId);
      }
      if (RegistrationId !== 0) {
        try {
          console.log("entered in with RegistrationId not null");

          for (const cartItem of cartItems) {
            const totalPriceWithTaxInt = Math.round(
              cartItem.quantity * cartItem.Product_price * (1 + taxRate)
            );
            const result1 = await order({
              variables: {
                orderInput: {
                  CustomerFirstname: Firstname,
                  CustomerMobile: parseInt(Mobile),
                  CustomerLastname: Lastname,
                  Product_name: cartItem.Product_name,
                  Product_price: cartItem.Product_price,
                  Quantity: cartItem.quantity,
                  TotalPriceWithTax: totalPriceWithTaxInt,
                  Date: pickupDate,
                  Time: Time,
                  DeliveryType: DeliveryType,
                  PaymentBy: PaymentBy,
                  CustomerId: RegistrationId,
                  CurrentDate: selectedDate,
                },
              },
            });

            console.log("result1.data " + result1.data.AddOrder._id);
            // console.log(
            //   "result.data.signupCustomer " + result1.data.signupCustomer._id
            // );
            if (result1.data && result1.data.AddOrder._id) {
              navigate("/Confirmation", {
                state: {
                  cartItems: cartItems,
                  totalPrice: totalPrice,
                  taxAmount: taxAmount,
                  totalPriceWithTax: totalPriceWithTax,
                },
              });
              //    console.log(
              //   "result1.data.signupCustomer " + result1.data.signupCustomer._id
              // );
              // RegistrationId = result1.data.signupCustomer._id;
              // alert("Successful");
              // navigate("/UserLogin");
            }
          }
        } catch (error1) {}
      } else {
        // if (result.data.checkExistingCustomerwithemailonly !== null) {
        //   try {
        //     console.log("enteredanother,");
        //     for (const cartItem of cartItems) {
        //       const totalPriceWithTaxInt = Math.round(
        //         cartItem.quantity * cartItem.Product_price * (1 + taxRate)
        //       );
        //       const result1 = await order({
        //         variables: {
        //           orderInput: {
        //             CustomerFirstname: Firstname,
        //             CustomerLastname: Lastname,
        //             CustomerMobile: parseInt(Mobile),
        //             Product_name: cartItem.Product_name,
        //             Product_price: cartItem.Product_price,
        //             Quantity: cartItem.quantity,
        //             TotalPriceWithTax: totalPriceWithTaxInt,
        //             Date: pickupDate,
        //             CurrentDate: selectedDate,
        //             DeliveryType: DeliveryType,
        //             PaymentBy: PaymentBy,
        //             CustomerId:
        //               result.data.checkExistingCustomerwithemailonly._id,
        //             Time: Time,
        //           },
        //         },
        //       });
        //       console.log("result1.data " + result1.data.AddOrder._id);
        //       // console.log(
        //       //   "result.data.signupCustomer " + result1.data.signupCustomer._id
        //       // );
        //       if (result1.data && result1.data.AddOrder._id) {
        //         navigate("/Confirmation", {
        //           state: {
        //             cartItems: cartItems,
        //             totalPrice: totalPrice,
        //             taxAmount: taxAmount,
        //             totalPriceWithTax: totalPriceWithTax,
        //           },
        //         });
        //         //    console.log(
        //         //   "result1.data.signupCustomer " + result1.data.signupCustomer._id
        //         // );
        //         // RegistrationId = result1.data.signupCustomer._id;
        //         // alert("Successful");
        //         // navigate("/UserLogin");
        //       }
        //     }
        //   } catch (error1) {}
        // }
      }
    }
  };
  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (price, item) => price + item.quantity * item.Product_price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleCheckout = () => {
    // Perform checkout process here
    // For example, clear the cart and redirect to a thank you page
    localStorage.removeItem("cartItems");
    navigate("/thank-you");
  };

  const taxAmount = totalPrice * taxRate;
  const totalPriceWithTax = totalPrice + taxAmount;

  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section ends here */}

      <div class="form-row row">
        <div class="form-container col-md-7 ">
          <form class="checkout-form mx-3" onSubmit={handleSubmit}>
            <h3 class="text-center">CHECKOUT FORM</h3>

            <div class="row">
              <h3>Personal Information :</h3>
              <div class="col">
                <label for="first-name"> First Name</label>

                <input
                  id="Firstname"
                  type="text"
                  className="form-control"
                  placeholder="Enter First name"
                  name="Firstname"
                  value={Firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div class="col">
                <label for="first-name"> Last Name</label>

                <input
                  id="Lastname"
                  type="text"
                  className="form-control"
                  placeholder="Enter Last name"
                  name="Lastname"
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="pnumber"> Phone number</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  id="Mobile"
                  name="Mobile"
                  value={Mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div class="col" hidden>
                <label for="pnumber"> Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  id="Password"
                  name="Password"
                  value={Password}
                  onChange={(e) => setPassword(Mobile)}
                />
              </div>

              <div class="col">
                <label for="email"> Email</label>

                <input
                  type="Email"
                  className="form-control"
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <hr class="section-break"></hr>

            <div class="row">
              <h3>Contact Information:</h3>
              <div class="col">
                <label for="addressa"> Address 1</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter st and house number"
                  name="Address1"
                  id="Address1"
                  value={Address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>

              <div class="col">
                <label for="address2"> Address2</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter address"
                  name="Address2"
                  id="Address2"
                  value={Address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="zip"> Postal code</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Postal code"
                  name="PostalCode"
                  id="PostalCode"
                  value={PostalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div class="col">
                <label for="state">Select state (select one):</label>
                <select
                  class="form-select"
                  id="State"
                  name="State"
                  value={State}
                  onChange={handleDropdownStateChange}
                >
                  <option value={null}>Select State</option>
                  <option value="Ontario">Ontario</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                </select>
              </div>

              <div class="col">
                <label for="state">Select country (select one):</label>
                <select
                  class="form-select"
                  id="Country"
                  name="Country"
                  value={Country}
                  onChange={handleDropdownCountryChange}
                >
                  <option>Select Country</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>

            <hr class="section-break"></hr>
            <div class="row">
              <h3>Delivery Type:</h3>
              <div class="col-6">
                <label for="state">Select Delivery Type (select one):</label>
                <select
                  class="form-select"
                  id="delivery"
                  name="delivery"
                  value={DeliveryType}
                  onChange={handleDropdownDeliveryTypeChange}
                >
                  <option Value="null">Select Delivery Type</option>
                  <option value="Online Delivery">Online Delivery</option>
                  <option value="Pick up order">Pick up order</option>
                </select>
              </div>
            </div>
            {DeliveryType === "Pick up order" && (
              <div class="row">
                <div class="col-6">
                  <label for="Date">Date (select one):</label>

                  <input
                    class="form-control"
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={pickupDate}
                    onChange={handleDateChange}
                  ></input>
                </div>

                <div class="col-6">
                  <label for="Time">Time (select one):</label>
                  <select
                    class="form-select"
                    id="time"
                    name="time"
                    value={Time}
                    onChange={handleDropdownTimeChange}
                  >
                    <option>Select Time</option>
                    <option>09:00am</option>
                    <option>09:30am</option>
                    <option>10:00am</option>
                    <option>10:30am</option>
                    <option>11:00am</option>
                    <option>11:30am</option>
                    <option>12:00pm</option>
                    <option>12:30pm</option>
                    <option>01:00pm</option>
                    <option>01:30pm</option>
                    <option>02:00pm</option>
                    <option>04:00pm</option>
                    <option>04:30pm</option>
                    <option>05:00pm</option>
                    <option>05:30pm</option>
                    <option>06:00pm</option>
                    <option>06:30pm</option>
                    <option>07:00pm</option>
                    <option>07:30pm</option>
                  </select>
                </div>
              </div>
            )}
            <hr class="section-break"></hr>
            <div class="row">
              <h3>Payment Mehod:</h3>
              <select
                class="form-select"
                id="PaymentBy"
                name="PaymentBy"
                value={PaymentBy}
                onChange={handleDropdownPaymentByChange}
              >
                <option Value="null">Select Payment Mehod</option>
                <option value="Credit Card"> Credit Card</option>
                <option value="Debit Card"> Debit Card</option>{" "}
                <option value="Cash on delivery">Cash on delivery</option>
              </select>
            </div>
            {PaymentBy === "Credit Card" || PaymentBy === "Debit Card" ? (
              <>
                <div class="row">
                  <div class="col">
                    <label for="cardname"> Card Holder Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Card Holder Name"
                      id="CardHolderName"
                      name="CardHolderName"
                      value={CardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                    />
                  </div>

                  <div class="col">
                    <label for="cardnumber"> Card number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Card number"
                      id="CardNumber"
                      name="CardNumber"
                      value={CardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    <label for="cardexp"> Expiration</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter expiry date"
                      id="ExDate"
                      name="ExDate"
                      value={ExDate}
                      onChange={(e) => setExDate(e.target.value)}
                    />
                  </div>

                  <div class="col-3">
                    <label for="cvv"> CVV</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter cvv number"
                      id="Cvv"
                      name="Cvv"
                      value={Cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div class="row">
              <p>
                {" "}
                {errorMessages.length > 0 && (
                  <div style={{ color: "red", fontWeight: "700" }}>
                    <ul>
                      {errorMessages.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </p>
              <div class="col-3">
                <button class="check-button">CheckOut</button>
              </div>
            </div>
          </form>
        </div>

        <div class="col-md-4">
          <div class="cart-bottom side-cart">
            <div class="total" mb-4>
              <div>
                <div class="cart-container ">
                  <table className="mx-auto" width="100%">
                    <thead>
                      <tr>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.Product_name}</td>
                          <td>${item.Product_price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.quantity * item.Product_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="total" mb-4>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
