import { gql } from "@apollo/client";

export const INSERT_PRODUCTS_MUTATION = gql`

mutation Mutation($productName: String!, $productPrice: Float!, $productDescription: String!, $productImage: String!, $category: String!) {
  createProducts(Product_name: $productName, Product_price: $productPrice, Product_description: $productDescription, Product_image: $productImage, Category: $category) {
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
`