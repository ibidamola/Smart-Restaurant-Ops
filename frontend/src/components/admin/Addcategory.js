import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { INSERT_CATEGORY_MUTATION } from "../../graphql/InsertCatMutation";
import Header from "./Header";
function Addcategory() {
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
  const [categoryName, setCategoryName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [insertCategories, { loading, error, data }] = useMutation(
    INSERT_CATEGORY_MUTATION
  );

  const validateForm = () => {
    const errors = [];

    if (!categoryName) {
      errors.push("Category Name is required");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      insertCategories({
        variables: {
          categoryInsert: {
            category_name: categoryName,
          },
        },
        refetchQueries: [{ query: FETCH_ALL_CATEGORIES }],
      });

      navigate("/Additems");
      alert(`Categories inserted Successfully`);
    }
  };

  if (loading)
    return (
      <h2>
        ` Data is Loading <br /> ${error}`
      </h2>
    );

  if (error)
    return (
      <h2>
        `There is an error as below <br /> ${error.message}`
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
              <h4>Add Category</h4>
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
                  <label>Name</label>
                  <input
                    type="text"
                    id="categoryName"
                    className="form-control"
                    name="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary "
                  value="Submit"
                  style={{ margin: "0 auto" }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcategory;
