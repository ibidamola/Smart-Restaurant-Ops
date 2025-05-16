import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_PRODUCT_BY_ID } from "../../graphql/FetchProductById";
import { DELETE_PRODUCT_BY_ID } from "../../graphql/DeleteProductById";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import Header from "./Header";

function Deleteproduct() {
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
  const { id } = useParams();

  const { loading, error, data } = useQuery(FETCH_PRODUCT_BY_ID, {
    variables: { proId: id },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT_BY_ID, {
    variables: { proId: id },
    refetchQueries: [{ query: FETCH_ALL_PRODUCTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct();
      navigate("/Viewproduct");
      alert("Product Deleted Successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const product = data.getProductById_db;
  const {
    Product_name,
    Product_price,
    Product_description,
    Category,
    Product_image,
  } = product;

  return (
    <>
      <div className="container">
        <Header />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header p-3">
              <h4>Delete Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {Product_image && (
                  <div className="form-group mb-3">
                    <img
                      src={Product_image.url}
                      alt="Product"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
                <div className="form-group mb-3">
                  <label>Product Name : {Product_name}</label>
                </div>
                <div className="form-group mb-3">
                  <label>Price : {Product_price}</label>
                </div>
                <div className="form-group mb-3">
                  <label>Description : {Product_description}</label>
                </div>
                <div className="form-group mb-3">
                  <label>Category : {Category}</label>
                </div>

                <input
                  type="submit"
                  className="btn btn-danger"
                  value="Delete Product"
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

export default Deleteproduct;
