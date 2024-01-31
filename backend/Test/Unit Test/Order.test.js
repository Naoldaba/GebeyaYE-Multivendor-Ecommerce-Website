const Order = require("../../models/Order");
const orderController = require("../../controllers/orderControllers");

const mongoose = require("mongoose");
jest.mock("../../models/Order");
jest.mock("../../models/Product");
const mockRequest = {
  user: {
    _id: new mongoose.Types.ObjectId(),
  },
};

const mockResponse = {
  status: jest.fn(() => mockResponse),
  send: jest.fn(),
};

describe("getOrder function", () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch orders successfully", async () => {
    Order.find.mockResolvedValueOnce([
      {
        user: "user_id_here",
        userName: "John Doe",
        products: [
          {
            product_id: "product_id_here",
            quantity: 2,
            product_name: "Sample Product",
            product_owner: "product_owner_id_here",
          },
        ],
        totalAmount: 100,
        deliveryDate: "2023-01-01",
        deliveryLocation: "Sample Location",
      },
    ]);

    await orderController.getOrder({}, mockRes);

    expect(Order.find).toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith([
      {
        user: "user_id_here",
        userName: "John Doe",
        products: [
          {
            product_id: "product_id_here",
            quantity: 2,
            product_name: "Sample Product",
            product_owner: "product_owner_id_here",
          },
        ],
        totalAmount: 100,
        deliveryDate: "2023-01-01",
        deliveryLocation: "Sample Location",
      },
    ]);
  });

  it("should handle errors and return a 500 status", async () => {
    Order.find.mockRejectedValueOnce(new Error("Database error"));

    await orderController.getOrder({}, mockRes);

    expect(Order.find).toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("getUserOrder function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user's order", async () => {
    const mockOrder = {
      user: mockRequest.user._id,
      userName: "John Doe",
      products: [
        {
          product_id: new mongoose.Types.ObjectId(),
          quantity: 2,
          product_name: "Sample Product",
          product_owner: new mongoose.Types.ObjectId(),
        },
      ],
      totalAmount: 100,
      deliveryDate: "2023-01-01",
      deliveryLocation: "Sample Location",
    };

    Order.find.mockResolvedValueOnce([mockOrder]);

    await orderController.getUserOrder(mockRequest, mockResponse);

    expect(Order.find).toHaveBeenCalledWith({ user: mockRequest.user._id });
    expect(mockResponse.send).toHaveBeenCalledWith([mockOrder]);
  });

  it("should handle case where no order is found", async () => {
    Order.find.mockResolvedValueOnce(null);

    await orderController.getUserOrder(mockRequest, mockResponse);

    expect(Order.find).toHaveBeenCalledWith({ user: mockRequest.user._id });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith("order not found");
  });

  it("should handle errors and return a 500 status", async () => {
    Order.find.mockRejectedValueOnce(new Error("Database error"));

    await orderController.getUserOrder(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("deleteOrder function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle case where order is not found", async () => {
    Order.findOne.mockResolvedValueOnce(null);

    await orderController.deleteOrder(mockRequest, mockResponse);

    expect(Order.findOne).toHaveBeenCalledWith({ user: mockRequest.user._id });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith(
      "Order not found for the user"
    );
  });

  it("should handle case where product is not found in the order", async () => {
    const mockOrder = {
      user: mockRequest.user._id,
      products: [],
    };

    Order.findOne.mockResolvedValueOnce(mockOrder);

    await orderController.deleteOrder(mockRequest, mockResponse);

    expect(Order.findOne).toHaveBeenCalledWith({ user: mockRequest.user._id });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it("should handle errors and return a 500 status", async () => {
    Order.findOne.mockRejectedValueOnce(new Error("Database error"));

    await orderController.deleteOrder(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});
