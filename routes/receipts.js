import { Router } from "express";
import controller from "../controllers/receiptController.js";

const router = Router();

/*
 *  Endpoint: Process Receipts
 *  Response: JSON containing an id for the receipt.
 */
router.post("/process", controller.processReceipt);

/*
 *  Endpoint: Get Points
 *  Response: A JSON object containing the number of points awarded.
 */
router.get("/:id/points", controller.getReceiptPoints);

export default router;
