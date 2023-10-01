const createServer = require("./server");
const router = require("./routes/receipts.js");

const PORT = 8000;
const app = createServer();

app.listen(PORT, () => {
  app.use("/receipts", router);
  console.log("Server is listening to port:", PORT);
});
