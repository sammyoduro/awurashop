const mongoose = require("mongoose");
require("dotenv/config");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z0dsq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectDB = async () => {
  await mongoose.connect(`${process.env.DEVELOPMENT_DB_URL || URI}`);
  console.log("Database connected!");
};

module.exports = connectDB;
