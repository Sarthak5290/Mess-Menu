const express = require("express");
const { getMenuAll } = require("../controllers/menuController");

const router = express.Router();

// Get all menus and populate the admin field
router.get("/", getMenuAll); // Use the getMenu controller for this route

// Update or create menu for the logged-in admin

module.exports = router;
