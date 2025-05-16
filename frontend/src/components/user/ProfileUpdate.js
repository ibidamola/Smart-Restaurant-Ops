import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER_EXIST_QUERY } from "../../graphql/CheckExistingCustomer";
import { UPDATE_CUSTOMER_BY_ID } from "../../graphql/UpdateCustomerById";
import Header from "./Header";

function ProfileUpdate() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setemail] = useState("");
  const Email = localStorage.getItem("CustomerEmail");
  const [Message, setMessage] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [dataQ, { loading, errorQ }] = useMutation(CUSTOMER_EXIST_QUERY);
  const [updateUser, { loading1, error1, data1 }] = useMutation(
    UPDATE_CUSTOMER_BY_ID
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataQ({
          variables: { email: Email },
        });
        if (result.data) {
          const customer = result.data.checkExistingCustomerwithemailonly;
          setCustomerId(customer._id);
          setFirstname(customer.Firstname);
          setLastname(customer.Lastname);
          setMobile(customer.Mobile);
          setemail(customer.email);
          setAddress1(customer.Address1);
          setAddress2(customer.Address2);
          setPostalCode(customer.PostalCode);
          setState(customer.State);
          setCountry(customer.Country);

          setCustomerData(result.data); // Store the fetched customer data
        }

        console.log("customerData=" + customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, dataQ]);
  const handleInputChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        customerId: customerId,
        Firstname,
        Mobile: parseInt(Mobile),
        Lastname,
        email,

        Address1,
        Address2,
        PostalCode,
        State,
        Country,
        updatedData: {
          Firstname: Firstname,
          Lastname: Lastname,
          email: Email,
          Mobile: Mobile,

          Address1: Address1,
          Address2: Address2,
          PostalCode: PostalCode,
          State: State,
          Country: Country,
        },
      },
    });
    navigate("/profile");

    alert("Profile Updated Successfully");
  };

  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      <div class="oder">
        <div class="oder_main mt-5">
          <div class="profile_img">
            <img src="/img/profile.png"></img>
          </div>

          <div class="oder_form">
            <div class="form-row row">
              <div class="form-container  ">
                <form class="checkout-form" onSubmit={handleSubmit}>
                  <h3 class="text-center">Update Profile</h3>

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
                  </div>

                  <div class="row">
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
                    <h3>Address :</h3>
                    <div class="col">
                      <label for="Adress 1"> Address 1</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address1"
                        id="Address1"
                        name="Address1"
                        value={Address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label for="Adress 2"> Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address2"
                        id="Address2"
                        name="Address2"
                        value={Address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>{" "}
                  </div>
                  <div class="row">
                    <div class="col">
                      <label for="Postal Code"> Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="PostalCode"
                        id="PostalCode"
                        name="PostalCode"
                        value={PostalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label for="State"> State</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        id="State"
                        name="State"
                        value={State}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>{" "}
                  </div>
                  <div class="row">
                    <div class="col">
                      <label for="Country"> Country</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        id="Country"
                        name="Country"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" class="submit-button mt-3 a_button">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
