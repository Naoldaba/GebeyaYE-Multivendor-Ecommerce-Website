const request = require("supertest");
const { Product } = require("../../models/Product");
const { User } = require("../../models/User");
let server;
let testUser;

beforeEach(async () => {
  server = require("../../index");
});

afterEach(async () => {
  server.close();
  await User.deleteMany({});
});

describe("User Registration", () => {
  it("should register a user with optional files and return a valid token", async () => {
    const response = await request(server)
      .post("/api/user")
      .field("name", "Test User")
      .field("username", "testuser")
      .field("phone", "1234567890")
      .field("email", "testuser@example.com")
      .field("password", "password123")
      .field("accountNumber", "1234567890123456")
      .field("role", "Vendor")
      .field("isPremium", true)
      .field("address", "Test Address")
      .attach("licence", "Test/Integration Test/testImage/licence.png")
      .attach(
        "profilePicture",
        "Test/Integration Test/testImage/profilePicture.png"
      );

    expect(response.status).toBe(200);

    expect(response.header).toHaveProperty("authtoken");
  });

  it("should register a user without optional files and return a valid token", async () => {
    const response = await request(server)
      .post("/api/user")
      .field("name", "Test User")
      .field("username", "testuser")
      .field("phone", "1234567890")
      .field("email", "testuser@example.com")
      .field("password", "password123")
      .field("accountNumber", "1234567890123456")
      .field("role", "Buyer")
      .field("address", "Test Address");

    expect(response.status).toBe(200);
    expect(response.header).toHaveProperty("authtoken");
  });

  it("should return a 400 status for duplicate username", async () => {
    let testUser = new User({
      name: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      phone: "1234567890",
      role: "Buyer",
    });
    await testUser.save();
    const response = await request(server)
      .post("/api/user")
      .field("name", "Test User")
      .field("username", "testuser")
      .field("phone", "1234567890")
      .field("email", "testuser@example.com")
      .field("password", "password123")
      .field("accountNumber", "1234567890123456")
      .field("role", "Buyer")
      .field("isPremium", true)
      .field("address", "Test Address");

    expect(response.status).toBe(400);
    expect(response.text).toBe("The username is alredy taken");
  });
});

describe("GET /api/user/me", () => {
  let authToken;

  it("should return the profile of the authenticated user", async () => {
    const testUser = new User({
      name: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      phone: "1234567890",
      role: "Buyer",
    });

    await testUser.save();
    authToken = testUser.generetAuthToken();

    const response = await request(server)
      .get("/api/user/me")
      .set("authToken", authToken);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("username", "testuser");

    expect(response.body[0]).toHaveProperty("name", "Test User");
  });

  it("should return 401 if no authentication token is provided", async () => {
    const response = await request(server).get("/api/user/me");

    expect(response.status).toBe(401);
  });
});
