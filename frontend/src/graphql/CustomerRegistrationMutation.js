import { gql } from "@apollo/client";

export const CUSTOMER_REGISTRATION_MUTATION = gql`
  mutation Mutation($customerInput: CustomerInput) {
    signupCustomer(CustomerInput: $customerInput) {
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
