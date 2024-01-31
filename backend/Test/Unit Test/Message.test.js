const {
  sendMessage,
  getMyMessage,
} = require("../../controllers/messageControllers");
const Message = require("../../models/Message");
const { User } = require("../../models/User");
const mongoose = require("mongoose");

jest.mock("../../models/Message");
jest.mock("../../models/User");

describe("sendMessage function", () => {
  it("should send a message and return the saved message", async () => {
    const mockRequest = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
      body: {
        receiver: "receiverUsername",
        content: "Test message content",
      },
    };

    const mockUser = {
      _id: mockRequest.user._id,
      username: "senderUsername",
    };

    User.findById.mockResolvedValue(mockUser);

    const mockSavedMessage = {
      _id: new mongoose.Types.ObjectId(),
      sender_id: mockRequest.user._id,
      sender: "senderUsername",
      receiver: "receiverUsername",
      content: "Test message content",
      timestamp: expect.any(Date),
      isRead: false,
    };

    Message.prototype.save.mockResolvedValue(mockSavedMessage);

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await sendMessage(mockRequest, mockResponse);

    expect(User.findById).toHaveBeenCalledWith(mockRequest.user._id);

    expect(Message.prototype.save).toHaveBeenCalledWith();

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.send).toHaveBeenCalledWith(mockSavedMessage);
  });

  it("should handle errors and return a 500 status", async () => {
    const mockRequest = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
      body: {
        receiver: "receiverUsername",
        content: "Test message content",
      },
    };

    const error = new Error("Database error");

    User.findById.mockRejectedValue(error);

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await sendMessage(mockRequest, mockResponse);

    expect(User.findById).toHaveBeenCalledWith(mockRequest.user._id);

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});

describe("getMyMessage function", () => {
  it("should return messages for the authenticated user", async () => {
    const mockRequest = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
    };

    const mockMessages = [
      {
        _id: new mongoose.Types.ObjectId(),
        sender_id: mockRequest.user._id,
        sender: "senderUsername",
        receiver: "receiverUsername",
        content: "Test message content",
        timestamp: expect.any(Date),
        isRead: false,
      },
    ];

    Message.find.mockResolvedValueOnce(mockMessages);

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await getMyMessage(mockRequest, mockResponse);

    expect(Message.find).toHaveBeenCalledWith({
      $or: [
        { sender_id: mockRequest.user._id },
        { receiver: mockRequest.user._id },
      ],
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.send).toHaveBeenCalledWith(mockMessages);
  });

  it("should handle errors and return a 500 status", async () => {
    const mockRequest = {
      user: {
        _id: new mongoose.Types.ObjectId(),
      },
    };

    const error = new Error("Database error");

    Message.find.mockRejectedValue(error);

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await getMyMessage(mockRequest, mockResponse);

    expect(Message.find).toHaveBeenCalledWith({
      $or: [
        { sender_id: mockRequest.user._id },
        { receiver: mockRequest.user._id },
      ],
    });

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });
});
