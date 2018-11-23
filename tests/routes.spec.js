import fetch from "node-fetch";
import mongoose from "mongoose";
import dbConnection from "../config/database";
import Models from "../models/";

const BASE_URL = "http://localhost:3000";

function cleanDatabase(done) {
  dbConnection
    .then(() => {
      console.log("CONNECTING SUCCESFULLY TO THE DATABASE");
      mongoose.set("debug", true);
      mongoose.connection.dropDatabase();
      ensureDatabaseIndexes(done);
    })
    .catch(err => done(err));
}

function ensureDatabaseIndexes(done) {
  Models.forEach(schema => {
    schema.createIndexes(err => {
      if (err) return done(err);
    });
  });

  done();
}

function checkSecurityHeaders(headers) {
  expect(headers.get(["x-xss-protection"])).toMatch("1; mode=block");
  expect(headers.get(["x-download-options"])).toMatch("noopen");
  expect(headers.get(["strict-transport-security"])).toMatch(
    "max-age=15552000; includeSubDomains"
  );
  expect(headers.get(["connection"])).toMatch("close");
}

describe("API REST ROUTES", () => {
  beforeAll(done => {
    cleanDatabase(done);
  });

  test("Should return a correct response on the root route", async () => {
    const response = await fetch(BASE_URL, { method: "GET" });
    const { url, status, statusText, headers } = response;

    checkSecurityHeaders(headers);

    expect(status).toBe(200);
    expect(statusText).toMatch("OK");
    expect(url).toMatch(BASE_URL + "/docs");
    expect(typeof headers).toBe("object");
    expect(headers.get(["content-type"])).toMatch("text/html; charset=UTF-8");
  });

  describe("Database without information", () => {
    test("Should return a 404 error when there are no users in the database", async () => {
      const response = await fetch(BASE_URL + "/api/users", {
        method: "GET"
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      const { url, status, statusText, headers } = response;

      checkSecurityHeaders(headers);

      expect(status).toBe(404);
      expect(statusText).toMatch("Not Found");
      expect(url).toMatch(BASE_URL + "/api/users");

      //expect(users).toHaveLength(0);
      expect(headers.get(["content-type"])).toMatch("application/json");

      expect(jsonResponse).toMatchObject({
        success: false,
        error: "Not users found in the database"
      });
    });

    test("Should return a 404 error when there are no companies in the database", async () => {
      const response = await fetch(BASE_URL + "/api/companies", {
        method: "GET"
      });
      const jsonResponse = await response.json();
      const { url, status, statusText, headers } = response;

      checkSecurityHeaders(headers);

      expect(status).toBe(404);
      expect(statusText).toMatch("Not Found");
      expect(url).toMatch(BASE_URL + "/api/companies");

      //expect(users).toHaveLength(0);
      expect(headers.get(["content-type"])).toMatch("application/json");

      expect(jsonResponse).toMatchObject({
        success: false,
        error: "Not companies found in the database"
      });
    });
  });

  describe("Database with seeder data", () => {
    test("Should return all the app users", async () => {
      const response = await fetch(BASE_URL + "/api/users", { method: "GET" });
      const jsonResponse = await response.json();

      const { url, status, statusText, headers } = response;

      checkSecurityHeaders(headers);
    });
  });

  afterAll(done => {
    mongoose.connection.close();
    console.log("DATABASE CONNECTION CLOSED WITH SUCCESS");
    done();
  });
});
