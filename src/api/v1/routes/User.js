// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
  UpdateUserById,
} = require("../controllers");
const { AuthenticateUser } = require("../middleware");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Register a new user
router.post("/register", RegisterNewUser);

// Login user
router.post("/login", LoginUser);

// Get all users
router.get("/all", AuthenticateUser, GetAllUsers);

// Get user by id
router.get("/one/:userId", AuthenticateUser, GetUserById);

// Update user by id
router.put("/update/:userId", AuthenticateUser, UpdateUserById);

module.exports = router;
