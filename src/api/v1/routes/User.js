// -----------------------Third-party libraries and modules-----------------------
const express = require("express");

// -----------------------Custom libraries and modules-----------------------
const {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
} = require("../controllers");

// -----------Initialize the router-----------
const router = express.Router();

// -----------Routes-----------
// Register a new user
router.post("/register", RegisterNewUser);

// Login user
router.post("/login", LoginUser);

// Get all users
router.get("/all", GetAllUsers);

// Get user by id
router.get("/one/:userId", GetUserById);

module.exports = router;
