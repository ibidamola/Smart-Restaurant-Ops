import { gql } from "@apollo/client";

export const UPLOAD_IMAGE = gql`

mutation Mutation($url: String!) {
    uploadImage(url: $url) {
      _id
      url
    }
  }
`