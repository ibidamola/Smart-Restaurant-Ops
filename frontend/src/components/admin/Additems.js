import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { UPLOAD_IMAGE } from "../../graphql/Uploadimg";
import { INSERT_PRODUCTS_MUTATION } from "../../graphql/InsertProcMutation";
import Header from "./Header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
//import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNkll0obirU-CvSxzotZKs3kfYEvN9DQE",
  authDomain: "clothingstore-a76eb.firebaseapp.com",
  databaseURL: "https://clothingstore-a76eb-default-rtdb.firebaseio.com",
  projectId: "clothingstore-a76eb",
  storageBucket: "clothingstore-a76eb.appspot.com",
  messagingSenderId: "369833662928",
  appId: "1:369833662928:web:44e546dc70a58709b001d5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function Additems() {
  const fileInput = useRef();
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
  const [Product_name, setProduct_name] = useState("");
  const [Product_price, setProduct_price] = useState("");
  const [Product_description, setProduct_description] = useState("");
  const [Category, setCategory] = useState("");
  const [Product_image, setProduct_image] = useState("");
  const [productDetails, setProductDetails] = useState({
    Product_name: "",
    Product_price: "",
    Product_description: "",
    Category: "",
    Product_image: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [createProducts] = useMutation(INSERT_PRODUCTS_MUTATION);

  const { loading, error, data } = useQuery(FETCH_ALL_CATEGORIES);

  const handleInputChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, file.name);
    await uploadBytesResumable(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const validateForm = () => {
    const errors = [];

    if (!Product_name) {
      errors.push("Product Name is required");
    }
    if (!Product_price) {
      if (!parseFloat(Product_price)) {
        errors.push("Product Price is required");
      }
    }
    if (!Product_description) {
      errors.push("Product description is required");
    }
    // if (!Product_image) {
    //   errors.push("Product Image is required");
    // }
    if (!Category) {
      errors.push("Product Category is required");
    }
    setErrorMessages(errors);
    return errors.length === 0;
  };
  // useEffect(() => {
  //   const file = fileInput.current.files[0];
  //   if (file) {
  //     const storageRef = ref(storage, file.name);
  //     uploadBytesResumable(storageRef, file);
  //     const productImage = getDownloadURL(storageRef);

  //     // Update the Product_image field in the productDetails state
  //     setProduct_image({
  //       Product_image: productImage,
  //     });
  //   }
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInput.current.files[0];
    const storageRef = ref(storage, file.name);
    await uploadBytesResumable(storageRef, file);
    const productImage = await getDownloadURL(storageRef);

    // Update the Product_image field in the productDetails state
    setProduct_image({
      Product_image: productImage,
    });

    if (validateForm()) {
      createProducts({
        variables: {
          productName: Product_name,
          productPrice: parseFloat(Product_price),
          productDescription: Product_description,
          productImage: productImage,
          category: Category,
        },
      });

      navigate("/Viewproduct");

      alert("Product Added Successfully");
    }
  };

  //   if (loading)
  //     return (
  //       <h2>
  //         ` Data is Loading <br /> ${error}`
  //       </h2>
  //     );

  if (error) {
    console.error("Error fetching categories:", error.message);
  }

  return (
    <>
      <div className="container">
        <Header />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header p-3">
              <h4>Add Items</h4>
            </div>
            {errorMessages.length > 0 && (
              <div style={{ color: "#e17a7a" }}>
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
                  <label>Product Name</label>
                  <input
                    class="form-control"
                    type="text"
                    name="Product_name"
                    placeholder="Product Name"
                    value={Product_name}
                    onChange={(e) => setProduct_name(e.target.value)}
                  />
                </div>
                <div class="form-group mb-3">
                  <label>Price</label>
                  <input
                    class="form-control"
                    type="number"
                    name="Product_price"
                    placeholder="Product Price"
                    value={Product_price}
                    onChange={(e) => setProduct_price(e.target.value)}
                  />
                </div>
                <div class="form-group mb-3">
                  <label>Description</label>
                  <input
                    class="form-control"
                    type="text"
                    name="Product_description"
                    placeholder="Product Description"
                    value={Product_description}
                    onChange={(e) => setProduct_description(e.target.value)}
                  />
                </div>
                <div class="form-group mb-3">
                  <label>Image</label>
                  <input
                    class="form-control"
                    type="file"
                    onChange={handleImageUpload}
                    ref={fileInput}
                  />
                </div>

                <div class="form-group mb-3">
                  <label>Category</label>
                  <select
                    id="Category"
                    className="form-control"
                    type="text"
                    name="Category"
                    value={Category}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Additems;
