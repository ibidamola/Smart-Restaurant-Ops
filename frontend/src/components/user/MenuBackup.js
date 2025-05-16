import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import { Link } from "react-router-dom";
function Menu() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { loading, error, data } = useQuery(FETCH_ALL_PRODUCTS);
  const [search, setSearch] = useState("");

  if (error) {
    console.error("Error fetching Products:", error.message);
  }
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
    localStorage.setItem("Product_image", Product_image);
    localStorage.setItem("Category", Category);
  };
  const handleAddToCart = (product) => {
    const product_Id = product._id;
    console.log("product_Id=" + product_Id);
    const userId = localStorage.getItem("CustomerloginData");
    const ProductExist = cartItems.find((item) => item._id === product_Id);
    console.log("ProductExist=" + ProductExist);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product_Id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("cartItems=" + cartItems);
    console.log("product_Id=" + product_Id, "userId=" + userId);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
      {/* header section start from here */}
      <header>
        <a href="#" class="nav-logo">
          <i class="fas fa-utensils"></i>EatToast
        </a>
        <div id="menu-button" class="fas fa-bars"></div>
        <nav class="navbar">
          <a href="/Index">Home</a>
          <a href="/Menu">Menu</a>
          <a href="#">Order</a>
          <a href="#">Review</a>
          <a href="#">Profile</a>
        </nav>
      </header>
      {/* header section end here */}

      {/* menu section start here */}
      <section class="menu-section" id="menu-section">
        <h1 class="special-head text-center mt-5">
          {" "}
          Our <span> Menu</span>
        </h1>
        <p class="text-center">
          Veniam quis mollit laboris sit nisi fugiat occaecat do minim.
        </p>
        <div className="container mt-5 mb-5 px-5">
          <div className="row">
            <div className="col-md-12 ">
              <div className="input-group ">
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
        <div class="menu-box-container">
          {data?.getAllProducts_db
            .filter((product) => {
              return search.toLocaleLowerCase() === ""
                ? product
                : product.Product_name.toLocaleLowerCase().includes(search) ||
                    product.Product_description.toLocaleLowerCase().includes(
                      search
                    ) ||
                    product.Category.toLocaleLowerCase().includes(search);
            })
            .map((product) => (
              <div class="menu-box">
                <div class="menu-image">
                  <img src="/img/pancake.jpg" alt="menu-image1"></img>
                  <a href="#" class="fas fa-heart"></a>
                </div>
                <div class="menu-box-content">
                  <tr key={product._id}>
                    <div class="stars">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                    </div>
                    <h3>{product.Product_name}</h3>
                    <p>{product.Product_description}</p>
                    <Link
                      to={`/UserLogin`}
                      className="menu-button "
                      onClick={() => setData(product)}
                    >
                      Add to cart
                    </Link>{" "}
                    <button
                      id="addtocart"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      {" "}
                      ADD TO CART
                    </button>
                    <span class="item-price">${product.Product_price}</span>
                  </tr>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* menu section end here */}
    </>
  );
}

export default Menu;
