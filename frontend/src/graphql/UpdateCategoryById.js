import { gql } from "@apollo/client";

export const UPDATE_CATEGORY_BY_ID = gql`
  mutation Db_updateCategoryById($catId: ID, $updatedData: CategoryList) {
    db_updateCategoryById(cat_id: $catId, updated_data: $updatedData) {
      _id
      category_name
    }
  }
`;
