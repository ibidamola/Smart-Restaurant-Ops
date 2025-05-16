import { gql } from "@apollo/client";

export const FETCH_ALL_Coupon = gql`
  query Query {
    getAllCoupon_db {
      _id
      code
      discountType
      discountAmount
      expiryDate
      isActive
    }
  }
`;
