// -----------------------Third-party libraries & modules-----------------------
const express = require("express");

// -----------------------Custom libraries & modules-----------------------
const { SaveFile, DeleteFile } = require("../controllers");
const { FileUpload } = require("../libraries");

// -----------------------Initialize the router-----------------------
const router = express.Router();

// -----------------------Routes-----------------------
// Save file
router.post("/save", FileUpload("file"), SaveFile);

// Delete file
router.delete("/delete/:fileName", DeleteFile);

module.exports = router;
