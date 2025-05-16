import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
  mutation Mutation($reviewInput: ReviewInput) {
    createReview(ReviewInput: $reviewInput) {
      _id
      Firstname
      Lastname
      email
      Message
      Mobile
    }
  }
`;
