import { gql } from "@apollo/client";

export const DELETE_PRODUCT_BY_ID = gql`
mutation Db_deleteProductById($proId: ID) {
  db_deleteProductById(pro_id: $proId) {
    _id
    Product_name
    Product_price
    Product_description
    Product_image {
      url
    }
    Category
  }
}
`;


