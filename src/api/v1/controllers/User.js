// -----------------------Third-party libraries and modules-----------------------
const bcrypt = require("bcrypt");

// -----------------------Custom libraries and modules-----------------------
const { UserModel } = require("../models");
const { GenerateTokens } = require("../libraries");

// -----------------------Function to register a new user-----------------------
const RegisterNewUser = async (req, res) => {
  console.log(req.body);
  // Request body
  const {
    fullName,
    emailAddress,
    password,
    phoneNumber,
    imageUrl,
    gender,
    userType,
    dateCreated,
    timeCreated,
    dateUpdated,
    timeUpdated,
  } = req.body;

  try {
    // Check if email address or phone number already available
    const User = await UserModel.findOne({
      $or: [{ emailAddress }, { phoneNumber }],
    });

    if (User) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Email or phone number already exist!",
        },
      });
    }

    // Password encryptions
    const EncryptedPassword = await bcrypt.hash(password, 8);

    // New user
    const NewUser = new UserModel({
      fullName,
      emailAddress,
      password: EncryptedPassword,
      phoneNumber,
      imageUrl,
      gender,
      userType,
      dateCreated,
      timeCreated,
      dateUpdated,
      timeUpdated,
    });

    // Save new user to the database
    const SavedUser = await NewUser.save();

    return res.status(201).json({
      status: true,
      user: SavedUser,
      success: {
        message: "Successfully registered a new user!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to register a new user due to server error!",
      },
    });
  }
};

// -----------------------Function to login user-----------------------
const LoginUser = async (req, res) => {
  // Request body
  const { emailAddress, password } = req.body;

  try {
    // Check if email address already available
    const User = await UserModel.findOne({ emailAddress }).exec();
    if (!User) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong email address!" },
      });
    }

    // Check if password matches
    const PassMatch = await bcrypt.compare(password, User.password);
    if (!PassMatch) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong password!" },
      });
    }

    // Generate tokens
    const { accessToken } = GenerateTokens(User);

    return res.status(200).json({
      status: true,
      accessToken,
      success: { message: "Successfully logged in the user!" },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to login the user due to server error!" },
    });
  }
};

// -----------------------Function to get all users-----------------------
const GetAllUsers = async (req, res) => {
  try {
    const Users = await UserModel.find().exec();
    return res.status(200).json({
      status: true,
      users: Users,
      success: { message: "Successfully fetched all users!" },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to fetch all users due to server error!" },
    });
  }
};

// -----------------------Function to get user by id-----------------------
const GetUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check user already available
    const User = await UserModel.findOne({ _id: userId }).exec();
    if (!User) {
      return res.status(404).json({
        status: false,
        success: { message: "No user available for the provided user id!" },
      });
    }

    return res.status(200).json({
      status: true,
      user: User,
      success: { message: "Successfully fetched the user!" },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      success: { message: "Failed to fetch the user due to server error!" },
    });
  }
};

// -----------------------Function to update user by id-----------------------
const UpdateUserById = async (req, res) => {
  // Request params
  const { userId } = req.params;

  // Request body
  const { newPassword, currentPassword, dateUpdated, timeUpdated } = req.body;

  // Global variables
  let UpdatedUser, EncryptedPassword;

  try {
    // Check user already available
    const User = await UserModel.findOne({ _id: userId }).exec();
    if (!User) {
      return res.status(404).json({
        status: false,
        success: { message: "No user available for the provided user id!" },
      });
    }

    // Property validation
    if (currentPassword && newPassword) {
      // Check if current password matches
      const PassMatch = await bcrypt.compare(currentPassword, User.password);

      if (!PassMatch) {
        return res.status(400).json({
          status: false,
          error: { message: "Wrong current password!" },
        });
      }

      // Encrypt password
      EncryptedPassword = await bcrypt.hash(newPassword, 8);
    } else if (!currentPassword && newPassword) {
      return res.status(400).json({
        status: false,
        success: { message: "Not provided the current password!" },
      });
    } else if (!newPassword && currentPassword) {
      return res.status(400).json({
        status: false,
        success: { message: "Not provided the new password!" },
      });
    }

    // Update user
    UpdatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set:
          currentPassword && newPassword
            ? {
                password: EncryptedPassword,
                dateUpdated,
                timeUpdated,
              }
            : req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: true,
      user: UpdatedUser,
      success: {
        message:
          currentPassword && newPassword
            ? "Successfully updated the password of the user!"
            : "Successfully updated the basic information of the user!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      success: { message: "Failed to update the user due to server error!" },
    });
  }
};

module.exports = {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
  UpdateUserById,
};
