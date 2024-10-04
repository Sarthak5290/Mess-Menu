import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { state } = useAuth(); // Get the auth state
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const token = state.token || localStorage.getItem("token");
    
    // Check if token is not available and redirect to home page
    if (!token) {
      navigate('/'); // Redirect to home
    }
  }, [state.token, navigate]); // Add navigate to the dependency array

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Admin Dashboard</h1>
      {/* Add components or functionalities for admin here */}
      
      {/* Add a link to go to the MenuEditor */}
      <Link
        to="/admin/menu-editor"
        className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go to Menu Editor
      </Link>
    </div>
  );
};

export default AdminDashboard;
