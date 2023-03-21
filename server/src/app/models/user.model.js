const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique username"],
    unique: [true, "Username exists"],
    sparse: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Plesae provide a unique email"],
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
  },
  phone_no: {
    type: Number,
    // unique: [true, "Pleae provide a unique phone number"],
    // sparse: true,
  },
  profile: {
    type: String,
  },
  gender: {
    type: String,
  },
  organization: {
    type: String,
  },
  department: {
    type: String,
  },
  year: {
    type: String,
  },
  prn: {
    type: String,
    // unique: [true, "Please provide a unique PRN number"],
    // sparse: true,
  },
  location: {
    type: String,
  },
  dob: {
    type: String,
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
