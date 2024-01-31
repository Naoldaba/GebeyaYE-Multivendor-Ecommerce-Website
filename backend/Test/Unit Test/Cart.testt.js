const request = require("supertest");
const express = require("express");
const router = require("../../routes/Cart");
const {
  addCartItem,
  removeCartItem,
  getCartItem,
} = require("../../controllers/cartControllers");
const auth = require("../../middleware/auth");

jest.mock("../../controllers/cartControllers");
jest.mock("../../middleware/auth");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Cart Routes", () => {
  beforeEach(() => {
    auth.mockImplementation((req, res, next) => {
      // Mocking the auth middleware
      req.user = { userId: "1234567890" };
      next();
    });
  });

  test("GET / should call getCartItem controller with auth middleware", async () => {
    await request(app).get("/");

    expect(auth).toHaveBeenCalled();
    expect(getCartItem).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });

  test("POST / should call addCartItem controller with auth middleware", async () => {
    await request(app).post("/");

    expect(auth).toHaveBeenCalled();
    expect(addCartItem).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });

  test("DELETE /:id should call removeCartItem controller with auth middleware", async () => {
    await request(app).delete("/123");

    expect(auth).toHaveBeenCalled();
    expect(removeCartItem).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });
});
