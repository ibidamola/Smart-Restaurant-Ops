import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_REGISTRATION_MUTATION } from "../../graphql/CustomerRegistrationMutation";
import { useMutation, useQuery } from "@apollo/client";
import Header from "./Header";
function UserSignup() {
  const navigate = useNavigate();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [Mobile, setMobile] = useState("");
  const [Password, setPassword] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const [registration, { error, data }] = useMutation(
    CUSTOMER_REGISTRATION_MUTATION
  );

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
    if (!Password) {
      errors.push("Password is required");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await registration({
          variables: {
            customerInput: {
              Firstname,
              Mobile: parseInt(Mobile),
              Lastname,
              email,
              Password,
              Address1,
              Address2,
              PostalCode,
              State,
              Country,
            },
          },
        });
        // console.log("result.data " + result.data);
        // console.log("result.data.signupCustomer " + result.data.signupCustomer);
        if (result.data && result.data.signupCustomer) {
          alert("Successful");
          navigate("/UserLogin");
        }
      } catch (error) {
        // Check if the error message is related to an existing user
        if (
          error.message.includes(
            "User with the provided email and usertype already exists."
          )
        ) {
          setErrorMessages([
            `User with the provided email and usertype already exists. will you like to login? `,
          ]);
        }
        return;
      }
    }
  };
  return (
    <>
      <Header />
      <div class="login-container">
        <div class="login_form">
          <h1 class="special-head text-center">
            <span>Signup</span>
          </h1>
          {errorMessages.length > 0 && (
            <div style={{ color: "red", fontWeight: "700" }}>
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} class="login_input">
            <input
              id="Firstname"
              type="text"
              className="field"
              placeholder="First Name"
              name="Firstname"
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <input
              id="Lastname"
              type="text"
              className="field"
              placeholder="Last Name"
              name="Lastname"
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)}
            />

            <input
              type="text"
              className="field"
              placeholder="Phone No"
              id="Mobile"
              name="Mobile"
              value={Mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="Email"
              className="field"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="field"
              placeholder="Password"
              id="Password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" class="submit-button">
              Signup
            </button>
            <div class="tag">
              <span>All ready registered?</span>
              <a href="/UserLogin">Log In</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
