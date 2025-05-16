import { gql } from "@apollo/client";

export const FETCH_ALL_TABLEBOOKINGSLOT = gql`
  query Query {
    getAllTableBooking_db {
        _id
      tableName
      time
      date
      capacity
      available
      firstname
      lastname
      email
      phonenumber
    }
  }
`;
