import { gql } from "@apollo/client";

export const CUSTOMER_EXIST_QUERY = gql`
  mutation Mutation($email: String!) {
    checkExistingCustomerwithemailonly(email: $email) {
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
