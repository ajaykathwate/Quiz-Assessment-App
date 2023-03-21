const express = require("express");
const router = express.Router();

// import all controllers
const controller = require("../controllers/user.controller");
const {
  verifyUser,
  Auth,
  localVariables,
} = require("../middlewares/user.middleware");

// POST methods
router.post("/register", controller.register); // register user
router.post("/registerMail", controller.registerMail); // send the email
router.post("/authenticate", verifyUser, (req, res) => res.end()); // authenticate user
router.post("/login", verifyUser, controller.login); // login in app

// GET methods
router.get("/user/:username", controller.getUser); // user with username
router.get("/generateOTP", verifyUser, localVariables, controller.generateOTP); // generate random otp
router.get("/verifyOTP", controller.verifyOTP); // verify generated OTP
router.get("/createResetSession", controller.createResetSession); // reset all the variables

// PUT methods
router.put("/updateuser", Auth, controller.updateUser); // update he user profile
router.put("/resetPassword", verifyUser, controller.resetPassword); // use to reset password

module.exports = router;
