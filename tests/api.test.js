const supertest = require("supertest");
const createServer = require("../server.js");
const receipts = require("../examples/exampleReceipts.js");
const { v4: uuidv4 } = require("uuid");
const router = require("../routes/receipts.js");

const server = createServer();
server.use("/receipts", router);

receipts.forEach((receipt) => {
  describe(`${receipt.retailer}:`, () => {
    let receiptId;
    // Tests for Process Receipt endpoint ---
    describe("Process Receipt", () => {
      test("testEmptyRequestBody", async () => {
        const res = await supertest(server)
          .post("/receipts/process")
          .expect(400)
          .then((res) => {
            expect(res.body.error).toBe("The receipt is invalid");
          });
      });

      test("testProcessReceipt", async () => {
        const res = await supertest(server)
          .post("/receipts/process")
          .set("Accept", "application/json")
          .send(receipt)
          .expect(200)
          .then((res) => {
            expect(res.body).toBeDefined();
            receiptId = res.body.id;
          });
      });
    });
    // --------------------------------------

    // Tests for GetPoints endpoint ---
    describe("Get Points", () => {
      test("testGetPoints", async () => {
        const res = await supertest(server)
          .get(`/receipts/${receiptId}/points`)
          .expect(200)
          .then((res) => {
            expect(res.body.points).toBeDefined();
            const points = res.body.points;
            expect(points).toEqual(receipt.expected);
          });
      });

      test("testGetPointsIdNotFound", async () => {
        let randomId = uuidv4();
        const res = await supertest(server)
          .get(`/receipts/${randomId}/points`)
          .expect(404)
          .then((res) => {
            expect(res.body.error).toBe("No receipt found for that id");
          });
      });
    });
  });
  // --------------------------------
});

module.exports = { testEnvironment: "node" };
