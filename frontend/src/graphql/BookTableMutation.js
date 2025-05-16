import { gql } from "@apollo/client";

export const BOOK_TABLE_MUTATION = gql`

mutation BookTable($tableName: String!, $date: String!, $time: String!, $capacity: String!, $firstname: String, $lastname: String, $phonenumber: Int, $email: String) {
  bookTable(tableName: $tableName, date: $date, time: $time, capacity: $capacity, firstname: $firstname, lastname: $lastname, phonenumber: $phonenumber, email: $email) {
    _id
    tableName
    time
    date
    capacity
    available
    firstname
    lastname
    phonenumber
    email
  }
}
  `