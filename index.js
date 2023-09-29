const createServer = require("./server");

const PORT = 8000;
const app = createServer();

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// TODO: handle server errors
app.listen(PORT, () => console.log("Server is listening to port:", PORT));
