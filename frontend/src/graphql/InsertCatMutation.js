import { gql } from "@apollo/client";

export const INSERT_CATEGORY_MUTATION = gql`


mutation Mutation($categoryInsert: CategoryList) {
    insertCategories(categoryInsert: $categoryInsert) {
      _id
      category_name
    }
  }
`