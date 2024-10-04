import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MenuEditor = () => {
  const { state } = useAuth();
  const navigate = useNavigate(); // Initialize navigate
  const [menuItems, setMenuItems] = useState([]);
  const [adminName, setAdminName] = useState(""); // State to store admin name
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = state.token || localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in again.");
      navigate("/"); // Redirect to Home page
      return;
    }

    const fetchMenu = async () => {
      console.log("MenuEditor token:", token);

      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/menu/admin`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setMenuItems(data.items || []);
        setAdminName(data.admin?.name || "Unknown Admin"); // Set admin name from the response
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(`Failed to fetch menu: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [state.token, navigate]); // Add navigate to the dependency array

  const handleItemChange = (index, value) => {
    setMenuItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = value;
      return newItems;
    });
  };

  const handleAddItem = () => {
    setMenuItems([...menuItems, ""]); // Add an empty new item
  };

  const handleRemoveItem = (index) => {
    const newItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (menuItems.length === 0) {
      return setError("Menu must have at least one item.");
    }

    setLoading(true);
    try {
      const token = state.token || localStorage.getItem("token"); // Get the token
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/menu/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token for auth
          },
          body: JSON.stringify({ items: menuItems }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update menu.");
      }

      setSuccess("Menu updated successfully!");
    } catch (err) {
      console.error("Error updating menu:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-50 rounded-lg shadow-md max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Edit Menu</h1>
      {adminName && <h2 className="text-lg text-gray-600">{`Admin: ${adminName}`}</h2>} {/* Display admin name */}
      
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {menuItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No menu items found. You can add your first item.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 w-full">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder={`Menu Item ${index + 1}`}
                required
                className="p-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add Item
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Menu"}
          </button>
        </form>
      )}
    </div>
  );
};

export default MenuEditor;
