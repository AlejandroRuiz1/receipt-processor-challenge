import { v4 as uuidv4 } from "uuid";

const receipts = {};

const processReceipt = (req, res) => {
  const receipt = req.body;
  const id = uuidv4();
  // TODO: calculate points for given receipt
  // TODO: store receipt with associated id and points in memory
  res.json({ id: `${id}` });
};

// TODO
const getReceiptPoints = (req, res) => {};

export default { processReceipt, getReceiptPoints };
