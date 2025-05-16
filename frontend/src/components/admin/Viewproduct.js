import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import { Link } from "react-router-dom";
import Header from "./Header";

function Viewproduct() {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items per page
  const { loading, error, data } = useQuery(FETCH_ALL_PRODUCTS);
  const [search, setSearch] = useState("");
  //   if (loading)
  //     return (
  //       <h2>
  //         ` Data is Loading <br /> ${error}`
  //       </h2>
  //     );

  const setData = (product) => {
    let {
      Product_name,
      _id,
      Product_price,
      Product_description,
      Product_image,
      Category,
    } = product;
    console.log("ID" + _id);
    localStorage.setItem("id", _id);
    localStorage.setItem("Product_name", Product_name);
    localStorage.setItem("Product_price", Product_price);
    localStorage.setItem("Product_description", Product_description);
    if (Product_image && typeof Product_image.url === "string") {
      localStorage.setItem("Product_image", Product_image.url);
    } else {
      console.error("Product_image.url is not a string:", Product_image.url);
    }

    localStorage.setItem("Category", Category);
  };
  if (error) {
    console.error("Error fetching Products:", error.message);
  }
  if (!data || !data.getAllProducts_db) {
    console.error("No data or empty data returned for Products.");
  }
  // Logic to calculate total number of pages
  const totalPages = Math.ceil(
    (data?.getAllProducts_db?.length || 0) / itemsPerPage
  );

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.getAllProducts_db?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  if (loading) return <h2>Data is Loading</h2>;
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 mx-1">
                <div className="input-group mx-4">
                  <input
                    id="search"
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="productbox">
            {currentItems
              ?.filter((product) => {
                return search.toLocaleLowerCase() === ""
                  ? product
                  : product.Product_name.toLocaleLowerCase().includes(search) ||
                      product.Product_description.toLocaleLowerCase().includes(
                        search
                      ) ||
                      product.Category.toLocaleLowerCase().includes(search);
              })
              .map((product) => (
                <div className="card">
                  <div className="dashboxicon">
                    <img src={product.Product_image.url} alt="product-img" />
                  </div>
                  <div>
                    <tr key={product._id}>
                      <div className="dashboxName">
                        Category Name : {product.Category}
                      </div>
                      <div className="dashboxName">
                        Product Name : {product.Product_name}
                      </div>
                      <div className="dashboxName">
                        Description : {product.Product_description}
                      </div>
                      <div className="dashboxName">
                        Price : {product.Product_price}
                      </div>
                      <div>
                        <Link
                          to={`/updateProduct/${product._id}`}
                          className="btn btn-primary "
                          onClick={() => setData(product)}
                        >
                          Update
                        </Link>{" "}
                        <Link
                          to={`/deleteProduct/${product._id}`}
                          className="btn btn-danger "
                          onClick={() => setData(product)}
                        >
                          Delete
                        </Link>
                      </div>
                    </tr>
                  </div>
                </div>
              ))}
          </div>
          <div className="pagination view-product">
            <button
              className="btn btn-primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="currentPage">{currentPage}</span>
            <button
              className="btn btn-primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewproduct;
