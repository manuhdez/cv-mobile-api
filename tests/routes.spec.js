const fetch = require("node-fetch");

const BASE_URL = "http://localhost:3000";

describe("API REST ROUTES", () => {
  test("Should return an ok response status on the root route", async (done) => {
    const response = await fetch(BASE_URL, { method: "GET" });

  });
  describe("Database without information", () => {
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
