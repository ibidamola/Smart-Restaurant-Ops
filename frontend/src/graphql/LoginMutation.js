import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!, $usertype: UserType!) {
    checkExistingUser(email: $email, Password: $password, Usertype: $usertype) {
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
