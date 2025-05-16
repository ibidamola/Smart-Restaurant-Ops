import { gql } from "@apollo/client";

export const FETCH_CATEGORY_BY_ID = gql`
  query Query($catId: ID) {
    getCategoryById_db(cat_id: $catId) {
      _id
      category_name
    }
  }
`;
