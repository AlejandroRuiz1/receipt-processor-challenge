import { v4 as uuidv4 } from "uuid";
import calculatePoints from "../functions/receiptFunctions.js";

const receipts = {};

// Takes in a JSON receipt and returns a JSON object with an ID
const processReceipt = (req, res) => {
  // Request body is required
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "The receipt is invalid" });
  }

  const receipt = req.body;
  const id = uuidv4();

  // Calculate points for given receipt
  receipt.points = calculatePoints(receipt);

  // Store receipt with associated id in memory
  receipts[id] = receipt;
  res.status(200).json({ id });
};

// Looks up receipt by id and returns points associated to receipt
const getPoints = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  const receipt = receipts[req.params.id];

  if (!receipt) {
    return res.status(404).json({ error: "No receipt found for that id" });
  }

  res.status(200).json({ points: receipt.points });
};

export default { processReceipt, getPoints };
