const fetch = require("node-fetch");
const dbConnection = require('../config/database')

const BASE_URL = "http://localhost:3000";

describe("API REST ROUTES", () => {
  beforeAll(() => {
    dbConnection
  .then(() => {
    console.log('CONNECTING SUCCESFULLY TO THE DATABASE');
  });
  test("Should return a correct response on the root route", async () => {
    const response = await fetch(BASE_URL, { method: "GET" });
    const { url, status, statusText, headers } = response;
    expect(status).toBe(200);
    expect(statusText).toMatch("OK");
    expect(url).toMatch(BASE_URL + "/docs");
    expect(typeof headers).toBe("object");
    expect(headers.get(["content-type"])).toMatch("text/html; charset=UTF-8");
    expect(headers.get(["x-xss-protection"])).toMatch("1; mode=block");
    expect(headers.get(["accept-ranges"])).toMatch("bytes");
    expect(headers.get(["x-download-options"])).toMatch("noopen");
    expect(headers.get(["strict-transport-security"])).toMatch(
      "max-age=15552000; includeSubDomains"
    );
    expect(headers.get(["connection"])).toMatch("close");
  });
  describe("Database without information", () => {
    before();
    test("Should return a 404 error when there are no users in the database", async () => {
      const response = await fetch(BASE_URL + "/api/users", { method: "GET" });
    });
  });

  describe("Database with seeder data", () => {
    test("Should return all the app users", async () => {
      const response = await fetch(BASE_URL + "/api/users", { method: "GET" });
    });
  });
});
