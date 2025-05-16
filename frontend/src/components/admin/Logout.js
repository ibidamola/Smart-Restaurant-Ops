import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  // Define the effect to run on component mount
  useEffect(() => {
    // Define the logout function
    const handleLogout = () => {
      // Remove the user's login data from localStorage
      localStorage.removeItem("loginData");

      // Redirect the user to the login page
      navigate("/Login");
    };

    // Call the logout function when the component mounts
    handleLogout();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return <div>Logout</div>;
}

export default Logout;
