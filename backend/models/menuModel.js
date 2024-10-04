const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    items: [
      {
        type: String,
        required: true,
      },
    ],
    // Reference to the admin user who manages this menu
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
