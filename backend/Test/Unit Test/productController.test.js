const {
  getAllProduct,
  search,
  getProduct,
  getOwndProduct,
  createProduct,
  deleteProduct,
} = require("../../controllers/productcontrollers");
const { Product, validateProduct } = require("../../models/Product"); 
const mongoose = require("mongoose");

jest.mock("../../models/Product");

describe("getAllProduct function", () => {
  it("should return all products", async () => {
    
    const mockProducts = [
      {
        _id: "1",
        name: "Product 1",
        price: 19.99,
        stock: 10,
        category: "Category 1",
      },
      {
        _id: "2",
        name: "Product 2",
        price: 29.99,
        stock: 5,
        category: "Category 2",
      },
    ];

    Product.find.mockResolvedValue(mockProducts);

    
    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getAllProduct({}, mockResponse);

    
    expect(mockResponse.send).toHaveBeenCalledWith(mockProducts);
  });

  it("should handle errors and return a 500 status on database fetch failure", async () => {
    
    Product.find.mockRejectedValue(new Error("Database error"));

    
    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getAllProduct({}, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("search function", () => {
  it("should return filtered products based on category and product name", async () => {
    
    const mockProducts = [
      {
        _id: "1",
        name: "Product 1",
        price: 19.99,
        stock: 10,
        category: "Category 1",
      },
      {
        _id: "2",
        name: "Product 2",
        price: 29.99,
        stock: 5,
        category: "Category 2",
      },
    ];

    Product.find.mockResolvedValue(mockProducts);

    
    const mockRequest = {
      query: { category: "Category 1", productName: "Product" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await search(mockRequest, mockResponse);

    
    expect(mockResponse.send).toHaveBeenCalledWith(mockProducts);
  });

  it("should handle errors and return a 500 status on database fetch failure", async () => {
    
    Product.find.mockRejectedValue(new Error("Database error"));

    
    const mockRequest = {
      query: { category: "Category 1", productName: "Product" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await search(mockRequest, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});

describe("getProduct function", () => {
  it("should return the product when a valid product ID is provided", async () => {
    
    const mockProduct = {
      _id: "1",
      name: "Sample Product",
      price: 19.99,
      stock: 10,
      category: "Sample Category",
    };
    Product.findById.mockResolvedValue(mockProduct);

    
    const mockRequest = {
      params: { id: "validProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getProduct(mockRequest, mockResponse);

    
    expect(mockResponse.send).toHaveBeenCalledWith(mockProduct);
  });

  it("should return a 404 status when the product ID is not found", async () => {
    
    Product.findById.mockResolvedValue(null);

    
    const mockRequest = {
      params: { id: "nonexistentProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getProduct(mockRequest, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith("Product not found");
  });

  it("should handle errors and return a 500 status on database fetch failure", async () => {
    
    Product.findById.mockRejectedValue(new Error("Database error"));

    
    const mockRequest = {
      params: { id: "validProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getProduct(mockRequest, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("getOwndProduct function", () => {
  it("should return products owned by the user", async () => {
    
    const mockProducts = [
      {
        _id: "1",
        name: "User's Product 1",
        price: 19.99,
        stock: 10,
        category: "Category 1",
        owner: "userId123", 
      },
      {
        _id: "2",
        name: "User's Product 2",
        price: 29.99,
        stock: 5,
        category: "Category 2",
        owner: "userId123", 
      },
    ];

    
    const mockRequest = {
      user: { _id: "userId123" }, 
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    Product.find.mockResolvedValue(mockProducts);

    
    await getOwndProduct(mockRequest, mockResponse);

    
    expect(mockResponse.send).toHaveBeenCalledWith(mockProducts);
  });

  it("should handle errors and return a 500 status on database fetch failure", async () => {
    
    Product.find.mockRejectedValue(new Error("Database error"));

    
    const mockRequest = {
      user: { _id: "userId123" }, 
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await getOwndProduct(mockRequest, mockResponse);

    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("createProduct function", () => {
  it("should create a new product and return it with a 201 status", async () => {
    
    const mockValidationResult = {
      error: null,
      value: {
        name: "Test Product",
        price: 29.99,
        description: "Test Description",
        stock: 10,
        category: "Test Category",
      },
    };
    validateProduct.mockReturnValue(mockValidationResult);

    
    const mockRequest = {
      body: mockValidationResult.value,
      file: { filename: "test_image.jpg" }, 
      user: { _id: "userId123" }, 
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    const mockSavedProduct = {
      _id: "1",
      name: "Test Product",
      price: 29.99,
      description: "Test Description",
      stock: 10,
      category: "Test Category",
      owner: "userId123",
      imageurl: "http://localhost:3000/public/images/test_image.jpg",
    };
    jest.spyOn(Product.prototype, "save").mockResolvedValue(mockSavedProduct);

    
    await createProduct(mockRequest, mockResponse);

    
    expect(validateProduct).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockSavedProduct);
  });

  it("should handle validation errors and return a 400 status", async () => {
    
    const mockValidationError = {
      error: new Error("Validation error"),
      value: null,
    };
    validateProduct.mockReturnValue(mockValidationError);

    
    const mockRequest = {
      body: null, 
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    await createProduct(mockRequest, mockResponse);

    
    expect(validateProduct).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it("should handle database errors and return a 500 status", async () => {
    
    const mockValidationResult = {
      error: null,
      value: {
        name: "Test Product",
        price: 29.99,
        description: "Test Description",
        stock: 10,
        category: "Test Category",
      },
    };
    validateProduct.mockReturnValue(mockValidationResult);

    
    const mockRequest = {
      body: mockValidationResult.value,
      user: { _id: "userId123" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    jest
      .spyOn(Product.prototype, "save")
      .mockRejectedValue(new Error("Database error"));

    
    await createProduct(mockRequest, mockResponse);

    
    expect(validateProduct).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("deleteProduct function", () => {
  it("should delete a product and return it with a 200 status", async () => {
    
    const mockRequest = {
      params: { id: "validProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    const mockDeletedProduct = {
      _id: "validProductId",
      name: "Deleted Product",
      price: 19.99,
      stock: 5,
      category: "Deleted Category",
    };
    Product.findByIdAndDelete.mockResolvedValue(mockDeletedProduct);

    
    await deleteProduct(mockRequest, mockResponse);

    
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith("validProductId");
    expect(mockResponse.send).toHaveBeenCalledWith(mockDeletedProduct);
  });

  it("should return a 404 status when the product ID is not found", async () => {
    
    const mockRequest = {
      params: { id: "nonexistentProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    Product.findByIdAndDelete.mockResolvedValue(null);

    
    await deleteProduct(mockRequest, mockResponse);

    
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
      "nonexistentProductId"
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith("Product not found");
  });

  it("should handle errors and return a 500 status on database delete failure", async () => {
    
    const mockRequest = {
      params: { id: "validProductId" },
    };

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    
    jest.fn().mockRejectedValueOnce(new Error("Database error")),
      
      await deleteProduct(mockRequest, mockResponse);

    
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith("validProductId");
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});
