import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const Menu = () => {
  const [menuItemsByAdmin, setMenuItemsByAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    });
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/menu`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();

        // Group menu items by admin
        const groupedMenu = data.reduce((acc, menu) => {
          const { admin, items, updatedAt } = menu;
          const adminName = admin?.name || "Unknown Admin";

          if (!acc[adminName]) {
            acc[adminName] = { items: [], updatedAt: null };
          }

          if (items && Array.isArray(items)) {
            acc[adminName].items = [...acc[adminName].items, ...items];
          }

          // Only update if it's the latest updatedAt
          if (!acc[adminName].updatedAt || new Date(updatedAt) > new Date(acc[adminName].updatedAt)) {
            acc[adminName].updatedAt = updatedAt;
          }

          return acc;
        }, {});

        setMenuItemsByAdmin(groupedMenu);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Convert groupedMenu object to an array and sort by updatedAt
  const sortedMenuItems = Object.entries(menuItemsByAdmin).sort((a, b) => {
    const dateA = new Date(a[1].updatedAt);
    const dateB = new Date(b[1].updatedAt);
    return dateB - dateA; // Sort in descending order
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedMenuItems.length > 0 ? (
          sortedMenuItems.map(([adminName, { items, updatedAt }]) => (
            <div
              key={adminName}
              className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold">{`Menu by ${adminName}`}</h3>
                {updatedAt && (
                  <span className="text-sm text-gray-500">
                    {`${formatDate(updatedAt)}`}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No menu items available</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
