const request = require("supertest");
const { User } = require("../../models/User");
const Order = require("../../models/Order");
const { Product } = require("../../models/Product");
const { Types } = require("mongoose");

let server;
let adminUser;
let testOrder;
let testUser;
beforeEach(async () => {
  server = require("../../index");

  adminUser = new User({
    name: "Admin User",
    username: "adminuser",
    email: "adminuser@example.com",
    phone: "1234567890",
    password: "adminpassword",
    role: "Admin",
    accountNumber: "1000254321525",
  });

  await adminUser.save();

  authToken = adminUser.generetAuthToken();

  testUser = new User({
    name: "Test User",
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    phone: "1234567890",
    role: "Buyer",
  });
  await testUser.save();

  testOrder = new Order({
    user: new Types.ObjectId(),
    userName: "Test User",
    products: [
      {
        product_id: new Types.ObjectId(),
        quantity: 2,
        product_name: "Test Product",
        product_owner: new Types.ObjectId(),
      },
    ],
    totalAmount: 50,
    deliveryDate: "2023-01-01",
    deliveryLocation: "Test Location",
  });

  await testOrder.save();
});

afterEach(async () => {
  server.close();
  await Order.deleteMany({});
  await User.deleteMany({});
  await Product.deleteMany({});
});

describe("GET /", () => {
  it("should return all orders for an admin user", async () => {
    const res = await request(server)
      .get("/api/order")
      .set("authToken", authToken);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].userName).toBe("Test User");
  });

  it("should return a 401 status if no authentication token is provided", async () => {
    const res = await request(server).get("/api/order");

    expect(res.status).toBe(401);
    expect(res.text).toBe("You dont have Access");
  });

  it("should return a 401 status if a non-admin user attempts to access", async () => {
    const nonAdminUser = new User({
      name: "Non-Admin User",
      username: "nonadminuser",
      email: "nonadminuser@example.com",
      phone: "1234567890",
      password: "nonadminpassword",
      accountNumber: "1000254321527",

      role: "Buyer",
    });

    await nonAdminUser.save();

    const nonAdminAuthToken = nonAdminUser.generetAuthToken();

    const res = await request(server)
      .get("/api/order")
      .set("authToken", nonAdminAuthToken);

    expect(res.status).toBe(401);
    expect(res.text).toBe("Unauthorized|");
  });
});

describe("/api/order/myorder", () => {
  it("should return the orders for the authenticated user", async () => {
    const authToken = testUser.generetAuthToken();

    const testOrder = new Order({
      user: testUser._id,
      userName: "Test User",
      products: [
        {
          product_id: "6594571a160076cb25a79c34",
          quantity: 2,
          product_name: "Test Product",
          product_owner: "6594571a160076cb25a79c33",
        },
      ],
      totalAmount: 50,
      deliveryDate: "2023-01-01",
      deliveryLocation: "Test Location",
    });
    await testOrder.save();

    const res = await request(server)
      .get("/api/order/myorder")
      .set("authToken", authToken);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
describe("POST /api/order", () => {
  it("should add a new order for the authenticated user", async () => {
    testUser.cart.push({
      productId: "6594571a160076cb25a79c33",
      name: "Test Product",
      description: "This is a test product",
      price: 19.99,
      owner: testUser._id,
      stock: 10,
      category: "Test Category",
      imageurl: "https://example.com/test-image.jpg",
    });

    await testUser.save();
    authToken = testUser.generetAuthToken();

    const res = await request(server)
      .post("/api/order")
      .set("authToken", authToken)
      .send({
        productDetail: [
          {
            product_id: testUser.cart[0].productId,
            quantity: 5,
            product_name: testUser.cart[0].name,
            product_owner: "6594571a160076cb25a79c33",
          },
        ],
        totalAmount: 19.99,
        date: "24-12-2024",
        location: "Test Location",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("user", testUser._id.toString());
    expect(res.body).toHaveProperty("userName", "Test User");
  });
});
