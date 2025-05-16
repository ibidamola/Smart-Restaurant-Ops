import { gql } from "@apollo/client";

export const FETCH_ALL_CATEGORIES = gql`
  query Query {
    getAllCategory_db {
      category_name
      _id
    }
  }
`;
