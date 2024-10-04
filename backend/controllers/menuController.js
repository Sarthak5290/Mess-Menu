const Menu = require("../models/menuModel");
const User = require("../models/userModel"); // Import User model if needed

// Get all menu items with associated admin names (Public)
const getMenuAll = async (req, res) => {
  try {
    // Populate the admin field and return menus
    const menus = await Menu.find().populate("admin", "name"); // Get admin's name
    res.status(200).json(menus); // Send the menu items as a response
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};


// Get menu items for the logged-in admin (Admin-specific)
const getMenuAdmin = async (req, res) => {
  try {
    const menu = await Menu.findOne({ admin: req.user._id }).populate("admin", "name");

    // Check if the menu was found
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Check if there are no items in the menu
    if (!menu.items || menu.items.length === 0) {
      return res.status(200).json({ 
        message: "No menu items found. You can add your first item.", 
        addItem: true // This flag can be used in the frontend to show the option to add a new item
      });
    }

    // If items exist, return the menu
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};





// Add or update menu for the logged-in admin
const updateMenu = async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }

  try {
    // Find the menu associated with the logged-in admin
    let menu = await Menu.findOne({ admin: req.user._id });

    if (menu) {
      // Update existing menu
      menu.items = items;
      const updatedMenu = await menu.save();
      res.status(200).json(updatedMenu);
    } else {
      // Create a new menu for the admin
      const newMenu = new Menu({
        items,
        admin: req.user._id, // Associate menu with the logged-in admin
      });
      const savedMenu = await newMenu.save();
      res.status(201).json(savedMenu);
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to update or create menu",
      error: error.message,
    });
  }
};

module.exports = { getMenuAll, getMenuAdmin, updateMenu };
