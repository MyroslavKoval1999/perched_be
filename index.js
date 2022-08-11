const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./src/database");
const { PORT } = require("./src/config");
const { API } = require("./src/routes");
const { ErrorHandler } = require("./src/errors");
const autoDeleteEvents = require('./src/api/autoDeleteEvents');

const { nftService } = require('./src/services')

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

var options = {
  explorer: true
};

const app = express();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use("/api", API);



// const txnHash =
//   "0x6c0f0ee8f7ece368152038c46659d5c3f7cd7f451f8883612011c19d768f5a22";
// web3.eth.getTransaction(txnHash, (err, res) => console.log(res));
// nftService.addTypes().then(() => {})

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on port -> ${PORT}`);
});

autoDeleteEvents();

app.use(ErrorHandler);