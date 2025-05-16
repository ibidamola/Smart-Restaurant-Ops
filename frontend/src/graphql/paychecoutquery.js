import { gql} from "@apollo/client";

export const PAYCHECKOUT = gql`
  query Query {
    createCheckoutSession
  }
`;