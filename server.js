const express = require("express");

function createServer() {
  const app = express();
  app.use(express.json()); // For parsing json request body
  return app;
}

module.exports = createServer;
