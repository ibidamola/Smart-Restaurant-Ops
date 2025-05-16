import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CUSTOMER_EXIST_QUERY } from "../../graphql/CheckExistingCustomer";

const MUTATION_PAYCHECKOUT = gql`
  mutation Mutation($order: [OrderInput!]) {
    cCheckoutSession(order: $order)
  }
`;

const PayButton = ({ cartItems, customer }) => {
  const [errorss, setErrorss] = useState([]);
  const [customerExist] = useMutation(CUSTOMER_EXIST_QUERY);
  const [startCheckout, { loading, error }] = useMutation(
    MUTATION_PAYCHECKOUT
  );
  console.log(cartItems, customer);

  const validateForm = () => {
    const validationErrors = [];

    if (cartItems.length === 0) {
      window.alert("Your cart is empty. Please add items to proceed.");
      window.location.assign("/menu"); // Redirect to the menu page
      return false;
    }

    // Perform validation checks
    if (!customer.Firstname) {
      validationErrors.push("Firstname field is required");
    }
    if (!customer.Lastname) {
      validationErrors.push("Lastname field is required");
    }
    if (!customer.DeliveryType) {
      validationErrors.push("Delivery Type Selection is required");
    }
    if (!customer.PaymentBy) {
      validationErrors.push("Payment Method is required");
    }
   

    if (!customer.Mobile) {
      validationErrors.push("Mobile is required");
    }
    if (!customer.Address1) {
      validationErrors.push("Address1 is required");
    }
    if (!customer.PostalCode) {
      validationErrors.push("PostalCode is required");
    }
    if (!customer.State) {
      validationErrors.push("State is required");
    }
    if (!customer.Country) {
      validationErrors.push("Country is required");
    }
    // Add more validation checks for other fields...

    setErrorss(validationErrors);

    // Return true if no errors, false otherwise
    return validationErrors.length === 0;
  };

  const handlePay = async () => {
    const isValid = validateForm();

    // If the form is valid, proceed with checkout
    if (isValid) {
      const { data } = await startCheckout({
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
            TotalPriceWithTax: customer.totalPriceWithTax,
            Time: customer.Time,
          })),
        },
      });

      // Handle checkout completion
      if (data) {
        const parsedData = JSON.parse(data.cCheckoutSession);
        const checkoutURL = parsedData.url;
        window.location.assign(checkoutURL);
      }
    }
  };

  return (
    <>
      {errorss.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <ul>
            {errorss.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={() => handlePay()}
        disabled={loading}
      >
        {loading ? "Processing..." : "Check Out"}
      </button>
    </>
  );
};

export default PayButton;
