import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import { FETCH_ALL_CATEGORIES } from "../../graphql/FetchCatQuery";
import { FETCH_PRODUCT_BY_ID } from "../../graphql/FetchProductById";
import { UPDATE_PRODUCT_BY_ID } from "../../graphql/UpdateProductById";
import Header from "./Header";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
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

function Updateproduct() {
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
  const fileInput = useRef();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const { loadingCat, errorCat, data } = useQuery(FETCH_ALL_CATEGORIES);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, file.name);
    await uploadBytesResumable(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    setProductImage(imageUrl);
  };

  const [updatePro, { loading1, error1, data1 }] =
    useMutation(UPDATE_PRODUCT_BY_ID);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a new image file has been selected
    if (fileInput.current.files.length > 0) {
      const file = fileInput.current.files[0];
      const storageRef = ref(storage, file.name);
      await uploadBytesResumable(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      // Update the productImage state with the new image URL
      setProductImage(imageUrl);
    }

    updatePro({
      variables: {
        proid: id,
        updatedPro: {
          Product_name: productName,
          Product_price: parseFloat(productPrice),
          Product_description: productDescription,
          Product_image: productImage,
          Category: category,
        },
      },
      refetchQueries: [{ query: FETCH_ALL_PRODUCTS }],
    });

    navigate("/Viewproduct");

    alert("Product Updated Successfully");
  };

  const { id } = useParams();

  const { loading, error, dataproduct } = useQuery(FETCH_PRODUCT_BY_ID, {
    variables: { proId: id },
  });

  useEffect(() => {
    const storedProductName = localStorage.getItem("Product_name");
    const storedProductPrice = localStorage.getItem("Product_price");
    const storedProductDescription = localStorage.getItem(
      "Product_description"
    );
    const storedProductImage = localStorage.getItem("Product_image");
    const storedCategory = localStorage.getItem("Category");

    if (dataproduct) {
      const {
        Product_name,
        Product_price,
        Product_description,
        Product_image,
        Category,
      } = dataproduct;
      setProductName(Product_name || storedProductName);
      setProductPrice(Product_price || parseFloat(storedProductPrice));
      setProductDescription(Product_description || storedProductDescription);
      setProductImage(Product_image || storedProductImage);
      setCategory(Category || storedCategory);
    } else {
      setProductName(storedProductName);
      setProductPrice(parseFloat(storedProductPrice));
      setProductDescription(storedProductDescription);
      setProductImage(storedProductImage);
      setCategory(storedCategory);
    }
  }, [dataproduct]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (loadingCat) return <p>Loading categories...</p>;

  return (
    <>
      <div className="container">
        <Header />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header p-3">
              <h4>Edit Product</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ProductName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="ProductPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ProductDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                    ref={fileInput}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Category</label>
                  <select
                    className="form-control"
                    name="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {data &&
                      data.getAllCategory_db &&
                      data.getAllCategory_db.map((cat) => (
                        <option key={cat._id} value={cat.category_name}>
                          {cat.category_name}
                        </option>
                      ))}
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateproduct;
