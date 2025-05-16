import logo from "./logo.svg";
import "./App.css";

import Layout from "./components/admin/Layout";
import Login from "./components/admin/Login";
import Registration from "./components/admin/Registration";
import Dashboard from "./components/admin/Dashboard";
import Addcategory from "./components/admin/Addcategory";
import Additems from "./components/admin/Additems";
import Viewproduct from "./components/admin/Viewproduct";
import Vieworders from "./components/admin/Vieworders";
import Products from "./components/admin/Products";
import Viewcategory from "./components/admin/Viewcategory";
import Upadatecategory from "./components/admin/Upadatecategory";
import Deletecategory from "./components/admin/Deletecategory";
import Updateproduct from "./components/admin/Updateproduct";
import Deleteproduct from "./components/admin/Deleteproduct";
import NoPage from "./components/admin/NoPage";
import Logout from "./components/admin/Logout";
import Table from "./components/user/Table";

import Index from "./components/user/Index";
import Menu from "./components/user/Menu";
import UserLogin from "./components/user/Login";
import UserSignup from "./components/user/Signup";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";
import UserLogout from "./components/user/Logout";
import ConfirmationPage from "./components/user/ConfirmationPage";
import Review from "./components/user/Review";
import Order from "./components/user/Order";
import Profile from "./components/user/Profile";
import ProfileUpdate from "./components/user/ProfileUpdate";
import Tableselection from "./components/manager/Tableselection";
import Viewordersmanager from "./components/admin/Viewordersmanager";

import Completeordersmanager from "./components/admin/Completeordersmanager";
import DailyEarningsPage from "./components/admin/DailyEarningsPage";
import AddCoupon from "./components/admin/AddCoupon";
import CheckoutSuccess from "./components/user/CheckoutSuccess";
import PayButton from "./components/user/PayButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          {" "}
        </Route>
        <Route path="Login" element={<Login />} />
        <Route path="Logout" element={<Logout />} />
        <Route path="Registration" element={<Registration />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Addcategory" element={<Addcategory />} />
        <Route path="Additems" element={<Additems />} />
        <Route path="Viewproduct" element={<Viewproduct />} />
        <Route path="Vieworders" element={<Vieworders />} />
        <Route path="Products" element={<Products />} />
        <Route path="Viewcategory" element={<Viewcategory />} />
        <Route path="/updateCat/:id" element={<Upadatecategory />} />
        <Route path="/deleteCat/:id" element={<Deletecategory />} />
        <Route path="/updateProduct/:id" element={<Updateproduct />} />
        <Route path="/deleteProduct/:id" element={<Deleteproduct />} />
        <Route path="*" element={<NoPage />} />
        <Route path="Index" element={<Index />} />
        <Route path="Menu" element={<Menu />} />
        <Route path="UserLogin" element={<UserLogin />} />
        <Route path="Table" element={<Table />} />
        <Route path="UserSignup" element={<UserSignup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CheckoutSuccess" element={<CheckoutSuccess />} />
        <Route path="Checkout" element={<Checkout />} />
        <Route path="Tableselection" element={<Tableselection />} />
        <Route path="UserLogout" element={<UserLogout />} />
        <Route path="Confirmation" element={<ConfirmationPage />} />
        <Route path="Review" element={<Review />} />
        <Route path="Order" element={<Order />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="ProfileUpdate" element={<ProfileUpdate />} />
        <Route path="Viewordersmanager" element={<Viewordersmanager />} />
        <Route
          path="Completeordersmanager"
          element={<Completeordersmanager />}
        />
        <Route path="DailyEarningsPage" element={<DailyEarningsPage />} />
        <Route path="PayButton" element={<PayButton />} />
        <Route path="AddCoupon" element={<AddCoupon />} />
        AddCoupon
      </Routes>
    </BrowserRouter>
  );
}

export default App;
