const request = require("supertest");
const express = require("express");
const router = require("../../routes/user");
const {
  userRegister,
  getUser,
  changeVendorStatus,
  getVendorPending,
  getuserByUsername,
  changependingVendor,
  getVendorApproved,
  deleteUser,
} = require("../../controllers/userControllers");

jest.mock("../../controllers/userControllers", () => ({
  userRegister: jest.fn(),
  getUser: jest.fn(),
  changeVendorStatus: jest.fn(),
  getVendorPending: jest.fn(),
  getuserByUsername: jest.fn(),
  changependingVendor: jest.fn(),
  getVendorApproved: jest.fn(),
  deleteUser: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/", router);

describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST / should call userRegister controller", async () => {
    await request(app)
      .post("/")
      .attach("licence", Buffer.from("license content"), "license.txt")
      .expect(200);

    expect(userRegister).toHaveBeenCalled();
  });

  test("GET /me should call getUser controller", async () => {
    await request(app)
      .get("/me")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(getUser).toHaveBeenCalled();
  });

  test("GET / should call getVendorPending controller", async () => {
    await request(app)
      .get("/")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(getVendorPending).toHaveBeenCalled();
  });

  test("PUT /cangeVendorStatus/:id should call changeVendorStatus controller", async () => {
    await request(app)
      .put("/cangeVendorStatus/123")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(changeVendorStatus).toHaveBeenCalledWith("123");
  });

  test("PUT /changepending/:id should call changependingVendor controller", async () => {
    await request(app)
      .put("/changepending/123")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(changependingVendor).toHaveBeenCalledWith("123");
  });

  test("POST /vendor should call getuserByUsername controller", async () => {
    await request(app)
      .post("/vendor")
      .send({ username: "testuser" })
      .expect(200);

    expect(getuserByUsername).toHaveBeenCalledWith({ username: "testuser" });
  });

  test("GET /approvedVendor should call getVendorApproved controller", async () => {
    await request(app)
      .get("/approvedVendor")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(getVendorApproved).toHaveBeenCalled();
  });

  test("DELETE /:id should call deleteUser controller", async () => {
    await request(app)
      .delete("/123")
      .set("Authorization", "Bearer token")
      .expect(200);

    expect(deleteUser).toHaveBeenCalledWith("123");
  });
});
