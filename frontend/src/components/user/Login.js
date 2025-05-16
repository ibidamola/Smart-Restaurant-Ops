import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CUSTOMER_LOGIN_MUTATION } from "../../graphql/CustomerLoginMutation";
import Header from "./Header";
function UserLogin() {
  const navigate = useNavigate();
  // Check if loginData exists in localStorage
  const CustomerloginData = localStorage.getItem("CustomerloginData");
  //console.log("CustomerloginData= " + CustomerloginData);
  useEffect(() => {
    // Define the logout function
    if (!CustomerloginData && CustomerloginData == null) {
      navigate("/UserLogin");
      //alert(`Please Login First`);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessages, setErrorMessages] = useState([]);

  const [checkExistingCustomer] = useMutation(CUSTOMER_LOGIN_MUTATION);
  const validateForm = () => {
    const errors = [];

    if (!email) {
      errors.push("Email field is required");
    }
    if (!password) {
      errors.push("Password is required");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await checkExistingCustomer({
          variables: { email, password },
        });
        // console.log(
        //   " data.checkExistingCustomer._id= " + data.checkExistingCustomer._id
        // );
        if (data.checkExistingCustomer) {
          localStorage.setItem(
            "CustomerloginData",
            data.checkExistingCustomer._id
          );
          localStorage.setItem(
            "CustomerEmail",
            data.checkExistingCustomer.email
          );

          navigate("/Index");
        }
      } catch (error) {
        if (error.message.includes("User not found")) {
          setErrorMessages([
            `User not found, please enter the right credentials or signup `,
          ]);
        }

        if (error.message.includes("Invalid password")) {
          setErrorMessages([`Invalid password, try again `]);
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
            <span>LOGIN</span>
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
          <form class="login_input" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="User Name"
              id="email"
              className="field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              id="password"
              className="field"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" class="submit-button">
              Login
            </button>
            <div class="tag">
              <span>New User?</span>
              <a href="/UserSignup">Sing Up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
