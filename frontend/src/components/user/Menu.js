import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FETCH_ALL_PRODUCTS } from "../../graphql/FetchProductQuery";
import { Link } from "react-router-dom";
import Header from "./Header";
function Menu() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
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
    alert(product.Product_name + " added to Cart Successfully !!!");
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      {/* menu section start here */}

      <div class="banner_bg">
        <h1>
          Our<span>Menu</span>
        </h1>
      </div>

      <section class="menu-section" id="menu-section">
        <div className="container  mb-5 px-5">
          <div className="row">
            <div className="col-md-12 ">
              <label for="search" class="s-label">
                Search Product Here:
              </label>
              <div className="input-group p-search">
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
                <tr key={product._id}>
                  <div class="menu-image">
                    <img src={product.Product_image.url} alt="menu-image"></img>
                    <a href="#" class="fas fa-heart"></a>
                  </div>
                  <div class="menu-box-content">
                    <div class="stars">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                    </div>
                    <h3>{product.Product_name}</h3>
                    <p>{product.Product_description}</p>
                    {/* <Link
                      to={`/Cart`}
                      className="menu-button "
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      ADD TO CART
                    </Link>{" "} */}
                    <button
                      className="menu-button "
                      id="addtocart"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      {" "}
                      ADD TO CART
                    </button>
                    <span class="item-price">${product.Product_price}</span>
                  </div>{" "}
                </tr>
              </div>
            ))}
        </div>
      </section>
      {/* menu section end here */}
    </>
  );
}

export default Menu;
