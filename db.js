const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/loginDB") // ← include DB name & use 127.0.0.1
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose.connection;
