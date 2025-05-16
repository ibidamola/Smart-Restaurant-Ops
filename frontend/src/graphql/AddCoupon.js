import { gql } from "@apollo/client";

export const ADD_COUPON_MUTATION = gql`
  mutation Mutation($couponInput: CouponInput) {
    AddCoupon(CouponInput: $couponInput) {
      isActive
      expiryDate
      discountType
      discountAmount
      code
      _id
    }
  }
`;
