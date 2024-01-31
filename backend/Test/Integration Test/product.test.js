const request = require("supertest");
const { Product } = require("../../models/Product");
const { User } = require("../../models/User");
let server;
let testUser;
let testProduct;

beforeEach(async () => {
  server = require("../../index");
  testUser = new User({
    name: "Test User",
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    phone: "1234567890",
    role: "Buyer",
  });

  testUser = await testUser.save();

  authToken = testUser.generetAuthToken();

  testProduct = new Product({
    name: "Test Product",
    description: "This is a test product",
    price: 19.99,
    owner: testUser._id,
    stock: 10,
    category: "Test Category",
    imageurl: "https://example.com/test-image.jpg",
  });

  testProduct = await testProduct.save();
});

afterEach(async () => {
  server.close();
  await Product.deleteMany({});
  await User.deleteMany({});
});

describe("/api/product", () => {
  describe("GET /", () => {
    it("should return all products", async () => {
      await Product.collection.insertMany([
        { name: "product1" },
        { name: "product2" },
      ]);
      const res = await request(server).get("/api/product");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(
        res.body.some((product) => product.name === "product1")
      ).toBeTruthy();
      expect(
        res.body.some((product) => product.name === "product2")
      ).toBeTruthy();
    });
    describe("GET /:id", () => {
      it("should return a product if a valid ID is provided", async () => {
        const res = await request(server).get(
          `/api/product/${testProduct._id}`
        );

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id", testProduct._id.toString());
        expect(res.body).toHaveProperty("name", testProduct.name);
        expect(res.body).toHaveProperty("owner", testUser._id.toString());
        expect(res.body).toHaveProperty(
          "imageurl",
          "https://example.com/test-image.jpg"
        );
      });
      it("should return a 404 status if an invalid ID is provided", async () => {
        const res = await request(server).get(
          "/api/product/65947a866644b06de2f44f20"
        );

        expect(res.status).toBe(404);
        expect(res.text).toBe("Product not found");
      });
    });
  });
  describe("GET /search", () => {
    it("should return search results based on query parameters", async () => {
      const res = await request(server)
        .get("/api/product/search")
        .query({ category: "Test Category", productName: "Test" });

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toContainEqual(
        expect.objectContaining({ name: "Test Product" })
      );
    });
    it("should return all products if no query parameters are provided", async () => {
      const testProduct = await Product.create({
        name: "Test Product",
        description: "This is a test product",
        price: 19.99,
        owner: testUser._id,
        stock: 10,
        category: "Test Category",
        imageurl: "https://example.com/test-image.jpg",
      });

      const res = await request(server).get("/api/product/search");
    });
  });
  describe("GET /api/product/myproduct", () => {
    it("should return the products owned by the user", async () => {
      const res = await request(server)
        .get("/api/product/myproduct")
        .set("authToken", authToken);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe("Test Product");
    });
    it("should return 401 if no authToken is provided", async () => {
      const res = await request(server).get("/api/product/myproduct");

      expect(res.status).toBe(401);
      expect(res.text).toBe("You dont have Access");
    });
    it("should return 400 if an invalid authToken is provided", async () => {
      const res = await request(server)
        .get("/api/product/myproduct")
        .set("authToken", "invalid_token");

      expect(res.status).toBe(400);
      expect(res.text).toBe("INVALID Token");
    });
  });
  describe("PUT /:id", () => {
    it("should update a product if a valid ID and authenticated user are provided", async () => {
      const updatedData = {
        name: "Updated Product",
        price: 29.99,
        description: "This product has been updated",
        stock: 5,
        category: "Updated Category",
      };

      const res = await request(server)
        .put(`/api/product/${testProduct._id}`)
        .set("authToken", authToken)
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", testProduct._id.toString());
      expect(res.body).toHaveProperty("name", "Updated Product");
      expect(res.body).toHaveProperty("price", 29.99);
    });
    it("should return a 404 status if an invalid ID is provided", async () => {
      const updatedData = {
        name: "Updated Product",
        price: 29.99,
        description: "This product has been updated",
        stock: 5,
        category: "Updated Category",
      };

      const res = await request(server)
        .put("/api/product/65947a866644b06de2f44f20")
        .set("authToken", authToken)
        .send(updatedData);

      expect(res.status).toBe(404);
      expect(res.text).toBe("Product not found");
    });
    it("should return a 401 status if no authentication token is provided", async () => {
      const updatedData = {
        name: "Updated Product",
        price: 29.99,
        description: "This product has been updated",
        stock: 5,
        category: "Updated Category",
      };

      const res = await request(server)
        .put(`/api/product/${testProduct._id}`)
        .send(updatedData);

      expect(res.status).toBe(401);
      expect(res.text).toBe("You dont have Access");
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a product if a valid ID and authenticated user are provided", async () => {
      const res = await request(server)
        .delete(`/api/product/${testProduct._id}`)
        .set("authToken", authToken);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", testProduct._id.toString());
      expect(res.body).toHaveProperty("name", "Test Product");

      const deletedProduct = await Product.findById(testProduct._id);
      expect(deletedProduct).toBeNull();
    });

    it("should return a 404 status if an invalid ID is provided", async () => {
      const res = await request(server)
        .delete("/api/product/65947a866644b06de2f44f20")
        .set("authToken", authToken);

      expect(res.status).toBe(404);
      expect(res.text).toBe("Product not found");
    });

    it("should return a 401 status if no authentication token is provided", async () => {
      const res = await request(server).delete(
        `/api/product/${testProduct._id}`
      );

      expect(res.status).toBe(401);
      expect(res.text).toBe("You dont have Access");
    });
  });
});
