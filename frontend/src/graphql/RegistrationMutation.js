import { gql } from "@apollo/client";

export const REGISTRATION_MUTATION = gql`
  mutation SignupUser($userInput: UserInput) {
    signupUser(userInput: $userInput) {
      _id
      Firstname
      Lastname
      email
      Address
      Mobile
      Password
      Usertype
    }
  }
`;
