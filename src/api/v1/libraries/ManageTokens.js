// -----------------------Third-party libraries & modules-----------------------
const jwt = require("jsonwebtoken");

// -----------------------Custom libraries and modules-----------------------
const Configs = require("../../../configurations");

// -----------------------Function to generate tokens-----------------------
const GenerateTokens = (user) => {
  try {
    // Create the payload
    const Payload = { id: user._id, userType: user.userType };

    // Generate the access token
    const AccessToken = jwt.sign(Payload, Configs.JWT_ACCESS_KEY, {
      expiresIn: "1h",
    });

    return { status: true, accessToken: AccessToken };
  } catch (err) {
    console.log(err);
    return { status: false, accessToken: null };
  }
};

// -----------------------Function to verify tokens-----------------------
const VerifyTokens = (token) => {
  try {
    const User = jwt.verify(token, Configs.JWT_ACCESS_KEY);

    return { status: true, tokenDetails: User };
  } catch (err) {
    console.log(err);
    return { status: false, tokenDetails: null };
  }
};

module.exports = { GenerateTokens, VerifyTokens };
