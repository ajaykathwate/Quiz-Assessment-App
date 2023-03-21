const UserModel = require("../models/user.model");

//
async function findUserByEmail(email) {
  try {
    console.log("auth.email", email.toLowerCase());
    return UserModel.findOne({ email });
  } catch (error) {
    throw new Error(`Unable to connect to the database.`);
  }
}

async function findUserByUsername(username) {
  try {
    console.log("username ", username);
    return UserModel.findOne( {username} );
  } catch (error) {
    throw new Error(`Unable to connect to the database.`);
  }
}

// other methods

module.exports = {
  findUserByEmail,
  findUserByUsername,
};
