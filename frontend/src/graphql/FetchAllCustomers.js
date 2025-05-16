import { gql } from "@apollo/client";
export const FETCH_All_CUSTOMERS = gql`
  query Query {
    getAllCustomers_db {
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
