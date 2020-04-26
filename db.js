const dotenv = require('dotenv')

dotenv.config()

const mongoose = require("mongoose");
const connection = process.env.DATABASE_CONNECTION_STRING;
const connectDb = () => {
  return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
};
module.exports = connectDb;