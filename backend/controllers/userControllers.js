const { User, UserValidater } = require("../models/User");

const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const validateResult = UserValidater(req.body);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
    }

    const {
      name,
      username,
      phone,
      email,
      password,
      accountNumber,
      role,
      isPaid,
      isPremium,
      address,
      status,
    } = validateResult.value;

    const usernameInUserDatabse = await User.findOne({ username: username });
    if (usernameInUserDatabse) {
      return res.status(400).send("The username is alredy taken");
    }

    let user = new User({
      name,
      username,
      phone,
      email,
      accountNumber,
      password,
      role,
      isPaid,
      isPremium,
      address,
      status,
    });

    if (role == "Vendor") {
      const { licence, profilePicture } = req.files;
      const serverBaseURL = "https://gebeyaye-backend.vercel.app";

      user.licence = `${serverBaseURL}/public/images/${licence[0].filename}`;
      user.profilePicture = `${serverBaseURL}/public/images/${profilePicture[0].filename}`;

      if (isPremium) {
        user.payment = "pendding";
      }
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.generetAuthToken();
    res.status(200).header("authToken", token).send({ name, username });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  const userId = req.user._id;
  const user = await User.find({ _id: userId });
  res.send(user);
};

const changeVendorStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (req.body.isPremium) {
      user.isPremium = req.body.isPremium;
    }

    user = await user.save();

    return res.send(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

const getVendorPending = async (req, res) => {
  try {
    const pendingVendor = await User.find({ status: "pendding" });
    return res.status(200).send(pendingVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const getVendorApproved = async (req, res) => {
  try {
    const approvedVendor = await User.find({ status: "approved" });
    return res.status(200).send(approvedVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const getuserByUsername = async (req, res) => {
  try {
    const userName = req.body.name;
    console.log(userName);
    const pendingVendor = await User.find({ username: userName });
    if (!pendingVendor) {
      return res
        .status(404)
        .send({ status: "user not register with this username" });
    }

    return res.status(200).send(pendingVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const changePenddingVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const approvedVendor = await User.findByIdAndUpdate(
      vendorId,
      { role: "Vendor", status: "approved" },
      { new: true }
    );

    return res.status(200).send(approvedVendor);
  } catch (error) {
    console.error("Error retrieving Users:", error);
    throw error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted_User = await User.findByIdAndDelete(userId);

    if (deleted_User) {
      res
        .status(200)
        .send({ message: "User deleted successfully", deleted_User });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const deleteMySelf = async (req, res) => {
  try {
    const userId = req.user._id;

    const deleted_User = await User.findByIdAndDelete(userId);

    if (deleted_User) {
      res
        .status(200)
        .send({ message: "User deleted successfully", deleted_User });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const changeMyStuates = async (req, res) => {
  try {
    const userId = req.user._id;
    const premiumVendor = await User.findByIdAndUpdate(
      userId,
      { isPremium: true, payment: "pendding" },
      { new: true }
    );

    res.status(200).send(premiumVendor);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const changeMyStuatesDown = async (req, res) => {
  try {
    const userId = req.user._id;
    const premiumVendor = await User.findByIdAndUpdate(
      userId,
      { isPremium: false, payment: "free" },
      { new: true }
    );

    res.status(200).send(premiumVendor);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  getUser,
  changeVendorStatus,
  getVendorPending,
  getuserByUsername,
  changePenddingVendor,
  getVendorApproved,
  deleteUser,
  deleteMySelf,
  changeMyStuates,
  changeMyStuatesDown,
};
