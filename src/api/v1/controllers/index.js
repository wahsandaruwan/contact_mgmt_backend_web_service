// -----------------------Imports-----------------------
const {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
  UpdateUserById,
} = require("./User");
const { SaveFile, DeleteFile } = require("./File");

// -----------------------Exports-----------------------
module.exports = {
  RegisterNewUser,
  LoginUser,
  GetAllUsers,
  GetUserById,
  UpdateUserById,
  SaveFile,
  DeleteFile,
};
