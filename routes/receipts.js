const express = require("express");
const controller = require("../controllers/receiptController.js");

const router = express.Router();

/*
 *  Endpoint: Process Receipts
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
 *  Endpoint: Get Points
 *  Response: A JSON object containing the number of points awarded.
 */
router.get(
  "/:id/points",
  (req, res, next) => {
    if (!req.params.id || req.params.id.length === 0) {
      return res.status(400).json({ error: "ID parameter is required" });
    }
    next();
  },
  controller.getPoints
);

module.exports = router;
