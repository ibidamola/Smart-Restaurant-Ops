import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { INSERT_PRODUCTS_MUTATION } from "../../graphql/InsertProcMutation";
import Header from "./Header";
function Products() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES);

  const [createProducts] = useMutation(INSERT_PRODUCTS_MUTATION);
  const validateForm = () => {
    const errors = [];

    if (!productName) {
      errors.push("productName is required");
    }
    if (!productPrice) {
      errors.push("productPrice is required");
    }
    if (!productDescription) {
      errors.push("productDescription is required");
    }
    if (!productImage) {
      errors.push("productImage is required");
    }
    if (!category) {
      errors.push("category is required");
    }
    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      createProducts({
        variables: {
          productInput: {
            Product_name: productName,
            Product_price: parseFloat(productPrice),
            Product_description: productDescription,
            Product_image: productImage,
            Category: category,
          },
        },
      });

      navigate("/Products");
      alert(`Successful`);
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
      <main class="insertbody" style={{ margin: "10% auto" }}>
        {errorMessages.length > 0 && (
          <div style={{ color: "#fff" }}>
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div class="formcontainer" style={{ margin: "0 auto" }}>
            <div className="col-md-11" class="formcontainer">
              <label htmlFor="ProductName" className="form-label">
                productName
              </label>
              <input
                type="text"
                id="ProductName"
                className="form-control"
                name="ProductName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="col-sm-11" class="formcontainer">
              <label htmlFor="productprice" className="form-label">
                productprice
              </label>
              <input
                type="number"
                className="form-control"
                id="productprice"
                name="productprice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div className="col-sm-11" class="formcontainer">
              <label htmlFor="productdescription" className="form-label">
                productdescription
              </label>
              <input
                type="text"
                id="productdescription"
                className="form-control"
                name="productdescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <div className="col-sm-11" class="formcontainer">
              <label htmlFor="productImage" className="form-label">
                productImage
              </label>
              <input
                type="file"
                id="productImage"
                className="form-control"
                name="productImage"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
            </div>

            <div className="col-sm-11" class="formcontainer">
              <label htmlFor="Category" className="form-label">
                Category
              </label>
              <select
                id="Category"
                className="form-control"
                type="text"
                name="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {data?.getAllCategory_db.map((cat) => (
                  <option key={cat._id} value={cat.category_name}>
                    {" "}
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              class="btn btn-primary "
              value="Submit"
              style={{ margin: "0 auto" }}
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Products;
