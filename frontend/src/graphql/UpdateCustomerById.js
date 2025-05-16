import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER_BY_ID = gql`
  mutation Mutation($customerId: ID, $updatedData: CustomerInput) {
    db_updateCustomerById(
      Customer_id: $customerId
      updated_data: $updatedData
    ) {
      _id
      Firstname
      Lastname
      email
      Mobile
      Password
      Address1
      Address2
      PostalCode
      State
      Country
    }
  }
`;
