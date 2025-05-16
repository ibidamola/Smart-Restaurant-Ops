import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Remove CustomerloginData from localStorage
    localStorage.removeItem("CustomerloginData");
    // Redirect to the homepage or any other page after logout
    navigate("/Index");
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
