import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { Link } from "react-router-dom";
import Header from "./Header";
function Viewcategory() {
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
  const [itemsPerPage] = useState(5); // Number of items per page

  const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES);
  const [search, setSearch] = useState("");
  //   if (loading)
  //     return (
  //       <h2>
  //         ` Data is Loading <br /> ${error}`
  //       </h2>
  //     );

  if (error) {
    console.error("Error fetching categories:", error.message);
  }

  if (!data || !data.getAllCategory_db) {
    console.error("No data or empty data returned for categories.");
  }
  const setData = (cat) => {
    let { category_name, _id } = cat;
    console.log("ID" + _id);
    localStorage.setItem("id", _id);
    localStorage.setItem("category_name", category_name);
  };
  // Logic to calculate total number of pages
  const totalPages = Math.ceil(
    (data?.getAllCategory_db?.length || 0) / itemsPerPage
  );

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.getAllCategory_db?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <div className="container">
        <Header />

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
          <div className="details">
            <div className="latestOrder">
              <div className="cardHeader">
                <h2>All Categories</h2>
              </div>

              <table>
                <thead>
                  <tr>
                    <td>Category Name</td>
                    <td>Update</td>
                    <td>Delete</td>
                  </tr>
                </thead>

                <tbody>
                  {currentItems
                    ?.filter((cat) => {
                      return search.toLocaleLowerCase() === ""
                        ? cat
                        : cat.category_name
                            .toLocaleLowerCase()
                            .includes(search);
                    })
                    .map((cat) => (
                      <tr key={cat._id}>
                        <td> {cat.category_name}</td>
                        <td>
                          <Link
                            to={`/updateCat/${cat._id}`}
                            className="btn btn-primary "
                            onClick={() => setData(cat)}
                          >
                            Update
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/deleteCat/${cat._id}`}
                            className="btn btn-danger "
                            onClick={() => setData(cat)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="pagination">
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
        </div>
      </div>
    </>
  );
}

export default Viewcategory;
