import { gql} from "@apollo/client";

export const MUTATION_PAYCHECKOUT = gql`
mutation Mutation($order: [OrderInput!]) {
  cCheckoutSession(order: $order)
}
`;