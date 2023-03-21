const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const ENV = require("../../config/config");
const otpGenerator = require("otp-generator");

// mailer imports
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../../config/config");

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      profile,
      name,
      phone_no,
      gender,
      organization,
      department,
      year,
      prn,
      location,
      dob,
      summary,
    } = req.body;

    // check for existing user
    const userWithUsername = await userService.findUserByUsername(username);
    if (userWithUsername) {
      console.log(userWithUsername);
      return res.status(409).send({ message: "Username is already taken." });
    } else {
      console.log("Username not verified");
    }

    // check for existing email
    const userWithEmail = await userService.findUserByEmail(email);
    if (userWithEmail) {
      console.log("email: ", userWithEmail);
      return res.status(409).send({ message: "Email is already taken." });
    } else {
      console.log("Email Not verified");
    }

    if (password) {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || "",
            email,
            name: "",
            phone_no: "",
            gender: "",
            organization: "",
            department: "",
            year: "",
            prn: "",
            location: "",
            dob: "",
            summary: "",
          });
          user
            .save()
            .then(() => {
              res.status(201).json({
                message: "User register successfully",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: "error in catch block: " + err.message,
              });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "error in catch block: " + "Unable to hash password",
          });
        });
    }
  } catch (err) {
    res.status(500).json({
      err: "error in catch block: " + err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        console.log(password, " & ", user.password);
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res
                .status(400)
                .json({ error: "Password does not match...!" });
            }
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
                email: user.email,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );
            return res.status(200).json({
              message: "Login successfull...",
              user: user,
              token,
            });
          })
          .catch((err) => {
            res.status(500).json({ err: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getUser = async (req, res) => {
  const username = req.params.username;
  try {
    UserModel.findOne({ username })
      .select({ password: 0, __v: 0 })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User does not exists with this username...",
          });
        }
        res.status(201).json({
          status: res.status,
          user,
        });
      })
      .catch((err) => {
        res.status(404).json({
          error: err.message,
        });
      });
  } catch (err) {
    res.status(404).json({
      error: "Can't find User...!",
    });
  }
};

exports.updateUser = async (req, res) => {
  // Find user and update it with the request body
  try {
    const { userId } = req.query;
    if (userId) {
      const updatedData = req.body;
      console.log("userId: ", userId);
      // console.log(updatedData);
      UserModel.findByIdAndUpdate({ _id: userId }, updatedData, { new: true })
        .select({ password: 0, __v: 0 })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: "User not found with id " + req.params.userId,
            });
          }
          // console.log("user: \n", user);
          res.status(201).json({
            message: "Record updated...!",
            user: user,
          });
        })
        .catch((err) => {
          console.log("err: ", err.message);
          if (err.kind === "ObjectId") {
            return res.status(404).json({
              message: "user not found with id " + req.params.userId,
            });
          }
          return res.status(500).json({
            message: "Error updating user with id " + req.params.userId,
          });
        });
    } else {
      return res.status(401).json({ error: "User not found!" });
    }
  } catch (err) {
    console.log("error in catch");
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).json({
    code: req.app.locals.OTP,
  });
};

exports.verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "OTP verified successfully!" });
  }
  return res.status(400).json({ err: "Invalid OTP" });
};

exports.createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).json({
      flag: req.app.locals.resetSession,
    });
  }
  res.status(440).json({
    error: "Session expired!",
  });
};

exports.resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).json({
        error: "Session expired!",
      });
    }
    const { username, password } = req.body;
    try {
      UserModel.findOne({ username }).then((user) => {
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            UserModel.updateOne(
              { username: user.username },
              { password: hashedPassword },
              { new: true }
            )
              .then(() => {
                console.log("Updated...!");
                console.log(hashedPassword);
                console.log(user.username, " && ", user.password);
                req.app.locals.resetSession = false; // allow access to this route only once
                return res.status(201).json({ message: "Record updated!" });
              })
              .catch((err) => {
                return res.status(500).json({
                  error: err.message || "can't update the password!",
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({ message: err.message });
          });
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};

exports.registerMail = async (req, res) => {
  const { userEmail, username, text, subject } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "CodeStrife",
      link: "http://localhost:3000/login-register/reset",
    },
  });

  let email = {
    body: {
      name: username,
      intro:
        text || "Welcome to CodeStrife! We are excited to have you on board.",
      outro: "Need any help? just reply to this email.",
    },
  };

  let emailBody = MailGenerator.generate(email);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: subject || "SignUp Successful",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email from us.",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
