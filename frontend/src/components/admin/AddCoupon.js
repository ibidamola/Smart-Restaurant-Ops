import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { ADD_COUPON_MUTATION } from "../../graphql/AddCoupon";
import { FETCH_ALL_Coupon } from "../../graphql/FetchCouponQuery";
import Header from "./Header";
function AddCoupon() {
  const navigate = useNavigate();
  const loginData = localStorage.getItem("loginData");
  console.log("Login Data= " + loginData);
  useEffect(() => {
    // Define the logout function
    if (!loginData && loginData == null) {
      navigate("/Login");
      //alert(`Please Login First`);
    }
  }, []);
  const [code, setCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of items per page

  const [insertCoupon, { loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_COUPON_MUTATION);
  const {
    loading: queryLoading,
    data: couponData,
    error: queryError,
  } = useQuery(FETCH_ALL_Coupon);
  const totalPages = Math.ceil(
    (couponData?.getAllCoupon_db?.length || 0) / pageSize
  );
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(
    startIndex + pageSize,
    couponData?.getAllCoupon_db?.length || 0
  );
  const paginatedCoupons = couponData?.getAllCoupon_db?.slice(
    startIndex,
    endIndex
  );

  const validateForm = () => {
    const errors = [];

    const pattern = /^[a-zA-Z0-9]{5,10}$/;

    if (!code) {
      errors.push("Discount Code is required");
    } else if (!pattern.test(code)) {
      errors.push(
        "Discount Code must be alphanumeric and between 5 and 10 characters"
      );
    }

    if (discountType == "percentage" || discountType == "fixed") {
      if (!discountAmount) {
        errors.push("Discount Amount is required");
      }
    }
    if (!discountType) {
      errors.push("Discount Type is required");
    }
    if (!expiryDate) {
      errors.push("Expiry Date is required");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      insertCoupon({
        variables: {
          couponInput: {
            code: code,
            discountAmount: parseInt(discountAmount),
            discountType: discountType,
            expiryDate: expiryDate,
            isActive: "true",
          },
        },
        refetchQueries: [{ query: FETCH_ALL_Coupon }],
      })
        .then(() => {
          // Optional: Show success message or navigate to another page
          console.log("Coupon inserted successfully");
        })
        .catch((error) => {
          // Handle error if insertion fails
          console.error("Error inserting coupon:", error);
        });
    }
  };

  const handleDropdownDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };
  if (mutationLoading || queryLoading) return <h2>Data is Loading...</h2>;

  if (mutationError || queryError)
    return (
      <h2>
        There is an error:{" "}
        {mutationError ? mutationError.message : queryError.message}
      </h2>
    );

  return (
    <>
      <div className="container">
        <Header />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header p-3">
              <h4>Add Coupon</h4>
            </div>
            {errorMessages.length > 0 && (
              <div style={{ color: "red" }}>
                <ul>
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group mb-3">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    id="code"
                    className="form-control"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div class="form-group mb-3">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Enter expiry date"
                    id="expiryDate"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div class="form-group mb-3">
                  <label>Coupon Type</label>
                  <select
                    class="form-select"
                    id="discountType"
                    name="discountType"
                    value={discountType}
                    onChange={handleDropdownDiscountTypeChange}
                  >
                    <option Value="null">Select Discount Type</option>
                    <option value="percentage"> Percentage</option>
                    {/* <option value="fixed"> Fixed</option>{" "}
                    <option value="free_shipping">Free Shipping</option>
                    <option value="bogo">bogo</option>
                    <option value="time_based">Time Based</option>
                    <option value="bundle">bundle</option> */}
                  </select>
                </div>
                {(discountType === "percentage" ||
                  discountType === "fixed") && (
                  <div class="form-group mb-3">
                    <label>Discount Amount</label>
                    <input
                      type="text"
                      id="discountAmount"
                      className="form-control"
                      name="discountAmount"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(e.target.value)}
                    />
                  </div>
                )}
                <input
                  type="submit"
                  className="btn btn-primary "
                  value="Submit"
                  style={{ margin: "0 auto" }}
                />
              </form>
            </div>
            <div className="card mt-5">
              <div className="card-header p-3">
                <h4>Coupon Data</h4>
              </div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead class="table table-dark">
                    <tr>
                      <th>Coupon Code</th>
                      <th>Expiry Date</th>
                      <th>Coupon Type</th>
                      <th>Discount Amount</th>
                      <th>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCoupons &&
                      paginatedCoupons.map((coupon) => (
                        <tr key={coupon._id}>
                          <td>{coupon.code}</td>
                          <td>
                            {new Date(coupon.expiryDate)
                              .toISOString()
                              .slice(0, 10)}
                          </td>
                          <td>{coupon.discountType}</td>
                          <td>{coupon.discountAmount}%</td>
                          <td>{coupon.isActive ? "Active" : "Inactive"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="currentPage">{currentPage}</span>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCoupon;
