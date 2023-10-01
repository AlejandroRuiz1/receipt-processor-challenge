const { v4: uuidv4 } = require("uuid");
const calculatePoints = require("../functions/calculatePoints.js");

const receipts = {};

// Takes in a JSON receipt and returns a JSON object with an ID
const processReceipt = (req, res) => {
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
  const id = req.params.id;
  const receipt = receipts[id];

  if (!receipt) {
    return res.status(404).json({ error: "No receipt found for that id" });
  }

  // Receipt found return points
  res.status(200).json({ points: receipt.points });
};

// --- Additional ---
// Returns json object with all receipts
const getAllReceipts = (req, res) => {
  return res.status(200).json({ receipts });
};

module.exports = { processReceipt, getPoints, getAllReceipts };
