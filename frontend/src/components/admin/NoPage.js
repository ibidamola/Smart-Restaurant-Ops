import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
function NoPage() {
  const navigate = useNavigate();

  return (
    <div class="container">
      <Header />

      <div class="main">
        <div class="details">
          <div class="latestOrder nopage">
            <h2>Page not Found</h2>

            <Link to="/Dashboard">Go to The Home Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
