const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js");

const connectDB = async () => {
  try {
    // Ensure only one slash between URI and DB name
    const uri = process.env.MONGODB_URI.endsWith("/")
      ? `${process.env.MONGODB_URI}${DB_NAME}`
      : `${process.env.MONGODB_URI}/${DB_NAME}`;
      
    const connectionInstance = await mongoose.connect(uri);
    
    console.log(
      "MongoDB connected successfully at " + connectionInstance.connection.host
    );
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
