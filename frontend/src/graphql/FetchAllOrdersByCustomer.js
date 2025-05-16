import { gql } from "@apollo/client";

export const FETCH_ALL_ORDERS_BY_CUSTOMER = gql`
query OrderItems($customerId: ID) {
  getOrderByCusomerId_db(CustomerId: $customerId) {
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
