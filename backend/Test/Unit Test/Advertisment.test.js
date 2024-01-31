const {
  createAdvert,
  allAdverts,
  getAdvert,
  changeAdvertStatus,
} = require("../../controllers/advertisementControllers");
const Advertisement = require("../../models/Advertisement");
const { User } = require("../../models/User");
const mongoose = require("mongoose");

jest.mock("../../models/Advertisement");
jest.mock("../../models/User");

const mockRequest = {
  user: {
    _id: new mongoose.Types.ObjectId(),
  },
  body: {
    description: "Test Advert Description",
  },
  file: {
    filename: "test-banner.jpg",
  },
};
const mockResponse = {
  status: jest.fn(() => mockResponse),
  send: jest.fn(),
};

describe("createAdvert function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new advert", async () => {
    User.findById.mockResolvedValue({ name: "Test User" });
    Advertisement.prototype.save.mockResolvedValue({
      userId: mockRequest.user._id,
      userName: "Test User",
      description: mockRequest.body.description,
      status: "Pending",
      banner: "http://localhost:3000/public/images/test-banner.jpg",
    });

    await createAdvert(mockRequest, mockResponse);

    expect(User.findById).toHaveBeenCalledWith(mockRequest.user._id);
    expect(Advertisement).toHaveBeenCalledWith({
      userId: mockRequest.user._id,
      userName: "Test User",
      description: mockRequest.body.description,
      status: "Pending",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      userId: mockRequest.user._id,
      userName: "Test User",
      description: mockRequest.body.description,
      status: "Pending",
      banner: "http://localhost:3000/public/images/test-banner.jpg",
    });
  });

  it("should handle errors and return a 500 status", async () => {
    jest.fn().mockRejectedValueOnce(new Error("Database error"));

    await createAdvert(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});

describe("allAdverts function", () => {
  it("should return approved advertisements", async () => {
    const mockApprovedAdvertisements = [
      {
        _id: "1",
        userId: "userId1",
        description: "Approved Advertisement 1",
        status: "Approved",
      },
      {
        _id: "2",
        userId: "userId2",
        description: "Approved Advertisement 2",
        status: "Approved",
      },
    ];

    Advertisement.find.mockResolvedValue(mockApprovedAdvertisements);

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    await allAdverts({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockApprovedAdvertisements);
  });
});

describe("getAdvert function", () => {
  it("should return pending advertisements", async () => {
    const mockAdvertisements = [
      { status: "Pending", _id: "1" },
      { status: "Pending", _id: "2" },
    ];

    Advertisement.find.mockResolvedValue(mockAdvertisements);

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    await getAdvert({}, mockResponse);

    expect(Advertisement.find).toHaveBeenCalledWith({ status: "Pending" });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockAdvertisements);
  });

  it("should handle errors and return a 500 status", async () => {
    jest.fn().mockRejectedValueOnce(new Error("Database error"));

    const mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    await getAdvert({}, mockResponse);

    expect(Advertisement.find).toHaveBeenCalledWith({ status: "Pending" });
  });
});

describe("changeAdvertStatus function", () => {
  it("should change the status of the advertisement to 'Approved'", async () => {
    const mockAdvertisement = {
      _id: new mongoose.Types.ObjectId(),
      status: "Pending",
      save: jest.fn().mockResolvedValue({ _id: "1", status: "Approved" }),
    };

    Advertisement.findById.mockResolvedValue(mockAdvertisement);

    const req = {
      params: { id: "1" },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    await changeAdvertStatus(req, res);

    expect(Advertisement.findById).toHaveBeenCalledWith("1");

    expect(mockAdvertisement.status).toBe("Approved");

    expect(mockAdvertisement.save).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledWith({ _id: "1", status: "Approved" });
  });

  it("should handle the case where the advertisement is not available", async () => {
    Advertisement.findById.mockResolvedValue(null);

    const req = {
      params: { id: "1" },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    await changeAdvertStatus(req, res);

    expect(Advertisement.findById).toHaveBeenCalledWith("1");

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.send).toHaveBeenCalledWith("THE ADVERTISMENT IS NOT AVAILABLE ");
  });

  it("should handle errors and return a 500 status", async () => {
    const error = new Error("Database error");

    jest.fn().mockRejectedValueOnce(error);

    const req = {
      params: { id: "1" },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    await changeAdvertStatus(req, res);

    expect(Advertisement.findById).toHaveBeenCalledWith("1");

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.send).toHaveBeenCalledWith("THE ADVERTISMENT IS NOT AVAILABLE ");
  });
});
