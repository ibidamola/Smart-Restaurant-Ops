import { gql } from "@apollo/client";

export const DELETE_CATEGORY_BY_ID = gql`
  mutation Db_deleteCategoryById($catId: ID) {
    db_deleteCategoryById(cat_id: $catId) {
      _id
      category_name
    }
  }
`;
