import request from "supertest";
import app from "../src/config/app";


/**
 * Testing status api
 */
describe("GET /api/v1/status", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/v1/status")
      .expect(200);
  });
});
