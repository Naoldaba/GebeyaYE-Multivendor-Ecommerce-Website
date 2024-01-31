const request = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("../../models/User");
let server;

describe("POST /api/auth", () => {
  beforeEach(async () => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });
  it("should return a valid token for a valid username and password", async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("testpassword", salt);
    const testUser = new User({
      name: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      phone: "1234567890",
      role: "Buyer",
    });
    await testUser.save();

    const res = await request(server)
      .post("/api/auth")
      .send({ name: "testuser", password: "testpassword" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return a 400 status for invalid credentials", async () => {
    const res = await request(server)
      .post("/api/auth")
      .send({ name: "nonexistentuser", password: "invalidpassword" });

    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid usename or password");
  });

  it("should return a 400 status for missing credentials", async () => {
    const res = await request(server).post("/api/auth").send({});

    expect(res.status).toBe(400);
    expect(res.text).toBe('"name" is required');
  });
});
