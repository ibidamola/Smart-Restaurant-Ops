import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REVIEW } from "../../graphql/AddReview";
import Header from "./Header";
import { FETCH_ALL_REVIEWS } from "../../graphql/FetchAllReviews";
function Review() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setemail] = useState("");
  const [Message, setMessage] = useState("");
  const [Mobile, setMobile] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const { loading, error, data } = useQuery(FETCH_ALL_REVIEWS);
  const [insertReview, { loading1, error1, data1 }] = useMutation(ADD_REVIEW);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);
  }, [loading, error, data]);
  const validateForm = async () => {
    const errors = [];

    if (!Firstname) {
      errors.push("Firstname field is required");
    }
    if (!Lastname) {
      errors.push("Lastname field is required");
    }
    if (!email) {
      errors.push("Email field is required");
    }

    if (!Mobile) {
      errors.push("Mobile is required");
    }
    if (!Message) {
      errors.push("Message is required");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };
  if (data) {
    console.log("data=" + data);
    console.error("No data or empty data returned for Reviews.");
  }
  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setemail("");
    setMessage("");
    setMobile("");
    setErrorMessages([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await insertReview({
          variables: {
            reviewInput: {
              Firstname,
              Lastname,
              email,
              Message,
              Mobile: parseInt(Mobile),
            },
            refetchQueries: [{ query: FETCH_ALL_REVIEWS }],
          },
        });
        // console.log("result.data " + result.data);
        // console.log("result.data.signupCustomer " + result.data.signupCustomer);
        if (result.data && result.data.createReview) {
          alert("Review Added Successfully! Thank You!!");
          resetForm();
          // navigate("/UserLogin");
        }
      } catch (error) {
        // Check if the error message is related to an existing user
        console.log("Error" + error);
        return;
      }
    }
  };
  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      <div class="book-table section bg-light">
        <div class="book-table-shape">
          <img src="/img/table-leaves-shape.png" alt="" />
        </div>

        <div class="book-table-shape book-table-shape2">
          <img src="/img/table-leaves-shape.png" alt="" />
        </div>

        <div class="sec-wp">
          <div class="row">
            <div class="col-lg-12">
              <div class="sec-title text-center ">
                <h1 class="special-head text-center">
                  {" "}
                  GIVE <span>REVIEW</span>
                </h1>
                <p class="sec-sub-para">
                  Your review matters a lot in your business .
                </p>
                <h2 class="section-break mx-auto w-50"></h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="oder">
        <div class="oder_main">
          <div class="form-row row">
            <div class="form-container">
              <form class="checkout-form" onSubmit={handleSubmit}>
                <div class="row">
                  <h3>Personal Information :</h3>
                  <div class="col">
                    <label for="first-name"> First Name</label>

                    <input
                      id="Firstname"
                      type="text"
                      className="form-control"
                      placeholder="Enter First name"
                      name="Firstname"
                      value={Firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>

                  <div class="col">
                    <label for="first-name"> Last Name</label>
                    <input
                      id="Lastname"
                      type="text"
                      className="form-control"
                      placeholder="Enter Last name"
                      name="Lastname"
                      value={Lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>

                  <div class="col">
                    <label for="pnumber"> Phone number</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      id="Mobile"
                      name="Mobile"
                      value={Mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div class="col">
                    <label for="email"> Email</label>

                    <input
                      type="Email"
                      className="form-control"
                      placeholder="Enter Email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                </div>

                <h2 class="section-break"></h2>

                <div class="row">
                  <h3>Add Information :</h3>
                  <div class="col">
                    {/* <label for="order-details"> Order Details</label> */}
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Message"
                      id="Message"
                      name="Message"
                      value={Message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                {errorMessages.length > 0 && (
                  <div style={{ color: "red", fontWeight: "700" }}>
                    <ul>
                      {errorMessages.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button type="submit" class="submit-button mt-3">
                  SUBMIT REVIEW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="review">
        <h1 class="text-center">Our Review</h1>
        <p class="text-center">
          Thanks for giving us a good review....We really appreciate it.
        </p>

        <div class="review_line_1"></div>
        <div class="review_box">
          {data?.getAllReview_db.map((review) => (
            <tr key={review._id}>
              <div class="review_card">
                <div class="review_tag">
                  <h2>{review.Firstname}</h2>
                  <p class="info">{review.Message}</p>
                  <button class="submit-button">Raed more</button>
                </div>
              </div>
            </tr>
          ))}
        </div>
      </div>
    </>
  );
}

export default Review;
