const express = require("express");
const controller = require("../controllers/receiptController.js");

const router = express.Router();

/*
 *  POST: Process Receipts
 *  Response: JSON containing an id for the receipt.
 */
router.post(
  "/process",
  (req, res, next) => {
    // Request body is required
    if (
      !req.body ||
      Object.keys(req.body).length === 0 ||
      !req.body.retailer ||
      !req.body.purchaseDate ||
      !req.body.purchaseTime ||
      !req.body.total ||
      !req.body.items.length
    ) {
      return res.status(400).json({ error: "The receipt is invalid" });
    }

    next();
  },
  controller.processReceipt
);

/*
 *  GET: Get Points
 *  Response: A JSON object containing the number of points awarded.
 */
router.get("/:id/points", controller.getPoints);

/*
 * --- Additional endpoint ---
 *  GET: Get all receipts
 *  Response: A JSON object containing all receipts.
 */
router.get("/", controller.getAllReceipts);

module.exports = router;
