const { validateProduct } = require("../../models/Product");

describe("validateProduct function", () => {
  it("should return an error if the product name is missing", () => {
    const invalidProduct = {
      description: "Test description",
      price: 19.99,
      stock: 10,
      category: "Test Category",
    };

    const result = validateProduct(invalidProduct);

    expect(result.error).toBeTruthy();
    expect(result.error.details[0].message).toContain('"name" is required');
  });

  it("should return an error if the product name exceeds the maximum length", () => {
    const invalidProduct = {
      name: "This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes This is a very long product name that exceeds the maximum length allowed for testing purposes",
      description: "Test description",
      price: 19.99,
      stock: 10,
      category: "Test Category",
    };

    const result = validateProduct(invalidProduct);

    expect(result.error).toBeTruthy();
    expect(result.error.details[0].message).toContain(
      '"name" length must be less than or equal to 200 characters'
    );
  });

  it("should return an error if required fields are missing", () => {
    const invalidProduct = {};

    const result = validateProduct(invalidProduct);

    expect(result.error).toBeTruthy();
    expect(result.error.details).toHaveLength(1);
  });

  it("should return a valid product if all required fields are present", () => {
    const validProduct = {
      name: "Test Product",
      description: "Test description",
      price: 19.99,
      stock: 10,
      category: "Test Category",
    };

    const result = validateProduct(validProduct);

    expect(result.error).toBeFalsy();
    expect(result.value).toEqual(validProduct);
  });
});
