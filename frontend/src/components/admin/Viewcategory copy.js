import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Viewcategory() {
  const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [currentPage, setcurrentPage] = useState(2);
  const [itemsPerPage, setItemPerPage] = useState(8);
  const totaItems = data?.getAllCategory_db.length;
  const allItems = data?.getAllCategory_db;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  console.log("firstItemIndex " + firstItemIndex);
  console.log("lastItemIndex " + lastItemIndex);

  let pages = [];

  for (let i = 1; i <= Math.ceil(totaItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const results = [];
  results.totaItems = totaItems;
  results.pageCount = Math.ceil(totaItems / itemsPerPage);
  if (lastItemIndex < totaItems) {
    results.next = {
      currentPage: currentPage + 1,
    };
  }
  if (firstItemIndex > 0) {
    results.prev = {
      currentPage: currentPage - 1,
    };
  }

  const currentItems = data?.getAllCategory_db.slice(
    firstItemIndex,
    lastItemIndex
  );
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

  function handlePageClick(e) {
    console.log(e);
  }

  return (
    <>
      <div className="container">
        <div class="admin-navigation">
          <ul>
            <li>
              <a href="#">
                <span class="title">EatToast</span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Dashboard">Dashboard</a>
                </span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="fast-food-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Addcategory">Add Category</a>
                </span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="restaurant"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Additems">Add Items</a>
                </span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="eye-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Viewproduct">View Product</a>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="eye-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Viewcategory">View Categories</a>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="cart-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Vieworders">View Order</a>
                </span>
              </a>
            </li>

            <li>
              <a href="#">
                <span class="icon">
                  <ion-icon name="exit-outline"></ion-icon>
                </span>
                <span class="title">
                  <a href="/Login">Log out</a>
                </span>
              </a>
            </li>
          </ul>
        </div>

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
                    .filter((cat) => {
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
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={8}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewcategory;
