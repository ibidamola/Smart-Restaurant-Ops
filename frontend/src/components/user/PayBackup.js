import React from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import axios from "axios";

const MUTATION_PAYCHECKOUT = gql`
mutation Mutation($order: [CartItemInput!]) {
    cCheckoutSession(order: $order)
  }
`;

const PAYCHECKOUT = gql`
  query Query {
    createCheckoutSession
  }
`;

const baseURL = "http://localhost:6002/";

const PayButton = ({ cartItems }) => {
  
  const [startCheckout, { loading, error, data }] = useMutation(
    MUTATION_PAYCHECKOUT,
    {
      variables: {
        order: cartItems.map((item) => ({
          Product_name: item.Product_name,
          Product_price: item.Product_price,
          quantity: item.quantity,
        })),
      },
      onCompleted: (queryData) => {
        console.log(queryData);
        let data = JSON.parse(queryData.cCheckoutSession);
        console.log(data);
        let chechoutURL = data.url;
        window.location.assign(chechoutURL);

        // Clear cart items from local storage
        localStorage.removeItem("cartItems");
      },
    }
  );

  if (loading) return null;
  if (error) return `Error! ${error}`;

  /*const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${baseURL}api/stripe/create-checkout-session`,
        {
          cartItems,
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };*/

  return (
    <button
      className="btn btn-primary btn-lg btn-block"
      onClick={() => startCheckout()}
    >
      Check Out
    </button>
  );
};

export default PayButton;