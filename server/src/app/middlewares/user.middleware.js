const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");
const ENV = require("../../config/config");
const userService = require("../services/user.service");

exports.verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check for existing user
    console.log(username);
    const userWithUsername = await userService.findUserByUsername(username);
    if (!userWithUsername) {
      return res.status(404).send({ message: "Username don't exist!" });
    }
    next();
  } catch (err) {
    res.status(404).json({
      error: "Authentication error.",
    });
  }
};

exports.Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    console.log("DecodedToken: \n", decodedToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Authentication failed!" });
  }
};

exports.localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
