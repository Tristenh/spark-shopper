const mongoose = require("mongoose");
//connects to mongoDB Atlas database if MONGODB_URI present else connects to local database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sparkshopper"
);

module.exports = mongoose.connection;
