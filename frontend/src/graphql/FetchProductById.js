import { gql } from "@apollo/client";

export const FETCH_PRODUCT_BY_ID = gql`
  query Query($proId: ID) {
    getProductById_db(pro_id: $proId) {
      _id
      Product_name
      Product_price
      Product_description
      Category
      Product_image {
        url
      }
    }
  }
`;
