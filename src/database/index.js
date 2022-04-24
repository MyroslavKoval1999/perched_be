const mongoose = require("mongoose");
const { MONGO_CONNECT_URL } = require("../config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
module.exports.connectDB = () => {
  console.log("Connecting to database...");
  mongoose
    .connect(`${MONGO_CONNECT_URL}`, options)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((error) => {
      console.log("Error connection to database:", error.message);
    });
};
