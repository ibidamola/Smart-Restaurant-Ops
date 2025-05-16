import { gql } from "@apollo/client";

export const FETCH_All_ORDERS = gql`
  query GetAllOrder_db {
    getAllOrder_db {
      _id
      CustomerFirstname
      CustomerLastname
      CustomerMobile
      orderItems {
        product_name
        product_price
        Quantity
      }
      TotalPriceWithTax
      Date
      CurrentDate
      DeliveryType
      PaymentBy
      CustomerId
      Time
    }
  }
`;
