import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_BY_ID = gql`
mutation Db_updateProductById($proid: ID!, $updatedPro: ProductDetails) {
  db_updateProductById(Proid: $proid, updatedPro: $updatedPro) {
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
