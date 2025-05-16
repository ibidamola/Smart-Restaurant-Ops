import { gql } from "@apollo/client";
export const DELETE_ORDER_BY_ID = gql`
  mutation Db_deleteOrderById($orderId: ID) {
    db_deleteOrderById(OrderId: $orderId) {
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
