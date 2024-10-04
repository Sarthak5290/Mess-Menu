const express = require("express");
const { updateMenu, getMenuAdmin, getMenuAll } = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");
const { authAdmin, registerAdmin } = require("../controllers/adminController");
const router = express.Router();

// Admin registration route (only for secret password holders)
router.post("/register", registerAdmin);

// Admin login
router.post("/login", authAdmin);

// Public route to get all menus
router.get("/menu/all", getMenuAll); // Publicly accessible

// Protected route to get admin's menu
router.get("/menu/admin", protect, getMenuAdmin); // Changed to GET for fetching

// Protected route to update or create menu
router.post("/menu/update", protect, updateMenu); // Requires authentication

module.exports = router;
