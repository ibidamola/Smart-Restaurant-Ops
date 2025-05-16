import { gql } from "@apollo/client";

export const CREATE_TABLE_MUTATION = gql`
mutation Mutation($tableName: String!, $time: String!, $date: String!, $capacity: String!, $available: Boolean!) {
    addTableBooking(tableName: $tableName, time: $time, date: $date, capacity: $capacity, available: $available) {
      tableName
      time
      date
      capacity
      available
    }
  }
`;
