import { gql } from "@apollo/client";

export const CUSTOMER_LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    checkExistingCustomer(email: $email, Password: $password) {
      _id
      Firstname
      Lastname
      email
      Mobile
      Password
    }
  }
`;
