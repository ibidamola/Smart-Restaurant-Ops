import { gql } from "@apollo/client";

export const UPDATE_ORDER_BY_ID = gql`
  mutation Mutation($updatedData: OrderInput, $orderId: ID) {
    db_updateOrderById(updated_data: $updatedData, Order_id: $orderId) {
      Status
      _id
    }
  }
`;
