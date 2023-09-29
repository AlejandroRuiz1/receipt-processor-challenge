const express = require("express");
const router = require("./routes/receipts.js");

function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/receipts", router);
  return app;
}

module.exports = createServer;
