const supertest = require("supertest");
const createServer = require("../server.js");
const receipts = require("../examples/exampleReceipts.js");

const server = createServer();

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
          .send(receipt)
          .set("Accept", "application/json")
          .expect(200)
          .then((res) => {
            expect(res.body).toBeDefined();
            receiptId = res.body.id;
            console.log({ id: receiptId });
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

      test("testGetPointsIdMissing", async () => {
        const res = await supertest(server)
          .get(`/receipts/points`)
          .expect(400)
          .then((res) => {
            expect(res.body.error).toBe("ID parameter is required");
          });
      });

      test("testGetPointsIdNotFound", async () => {
        const res = await supertest(server)
          .get("/receipts/incorrectId/points")
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
