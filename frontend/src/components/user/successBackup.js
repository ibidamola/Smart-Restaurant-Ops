import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = (event) => {
      // Prevent the default navigation behavior
      event.preventDefault();
      event.stopPropagation();

      // Redirect the user to the desired page
      navigate('/Menu');
    };

    // Add event listeners for navigation events
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('pushstate', handleNavigation);
    window.addEventListener('beforeunload', handleNavigation);

    // Replace the current history entry with a new one
    window.history.replaceState(null, '', location.pathname);

    // Prevent the browser from navigating back or forward
    window.onpopstate = () => window.history.go(1);

    // Remove event listeners on component unmount
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('pushstate', handleNavigation);
      window.removeEventListener('beforeunload', handleNavigation);
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <div>CheckoutSuccess</div>
      <button className="btn btn-success">
        <a href="/Menu">Menu Page</a>
      </button>
    </>
  );
}

export default CheckoutSuccess;