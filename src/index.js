// -----------------------Third-party components and modules-----------------------
const express = require("express");

// -----------------------Global instances-----------------------
const app = express();

// -----------------------Common middlewares-----------------------
// -----------Base route-----------
app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: `Welcome to the server!` });
});

// -----------Error route-----------
app.use((req, res) => {
  res.status(404).json({ status: false, message: `Not found!` });
});

// -----------------------Initialize the connection-----------------------
app.listen(3000, () => {
  console.log(`Server is running at 3000`);
});
