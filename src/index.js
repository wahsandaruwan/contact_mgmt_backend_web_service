// -----------------------Third-party libraries and modules-----------------------
const express = require("express");
require("dotenv/config");

// -----------------------Custom libraries and modules-----------------------
const Configs = require("./configurations");
const { ConnectDatabase } = require("./api/v1/libraries");
const { UserRoutes } = require("./api/v1/routes");

// -----------------------Global instances-----------------------
const app = express();
const PORT = Configs.PORT || 3308;

// -----------------------Common middlewares-----------------------

// -----------Accept json-----------
app.use(express.json());

// -----------Base route-----------
app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: `Welcome to the server!` });
});

// -----------User route-----------
app.use("/api/users", UserRoutes);

// -----------Error route-----------
app.use((req, res) => {
  res.status(404).json({ status: false, message: `Not found!` });
});

// -----------------------Initialize the connection-----------------------
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  ConnectDatabase()
    .then(() => console.log("Connected to Database!"))
    .catch((err) => console.log(err));
});
