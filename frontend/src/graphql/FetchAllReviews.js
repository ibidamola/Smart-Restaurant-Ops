import { gql } from "@apollo/client";

export const FETCH_ALL_REVIEWS = gql`
  query Query {
    getAllReview_db {
      _id
      Firstname
      Lastname
      email
      Message
      Mobile
    }
  }
`;
