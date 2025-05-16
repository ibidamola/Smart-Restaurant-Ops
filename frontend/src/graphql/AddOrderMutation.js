import { gql } from "@apollo/client";

export const ADD_ORDER_MUTATION = gql`
  mutation Mutation($orderInput: OrderInput) {
    AddOrder(OrderInput: $orderInput) {
      _id
      CustomerFirstname
      CustomerLastname
      CustomerMobile
      Product_name
      Product_price
      Quantity
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
