import express from "express";
import router from "./routes/receipts.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/receipts", router);

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// TODO: handle server errors
app.listen(PORT, () => console.log("Server is listening to port:", PORT));
