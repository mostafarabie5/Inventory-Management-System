const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../database");
const UserModel = require("../Models/userModel");
const AppError = require("../utils/appError");

exports.protectItem = async function (req, res, next) {
  try {
    let token;
    if (req.headers.authorization !== undefined)
      token = req.headers.authorization.split(" ")[1];
    else
      throw new AppError(
        "Unauthorized access. Please check your credentials and try again.",
        401,
      );

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = `SELECT * FROM USERS WHERE ID = ${decoded.id}`;

    const [[result]] = await connection.query(query);
    if (result === undefined)
      throw new AppError("Access Denied. Please login again!!", 404);
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(400).json({
        status: "error",
        requestedAt: req.requestedAt,
        message:
          "Unauthorized access. Please check your credentials and try again.",
      });
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }

  next();
};

exports.registrationValidation = async (email, username, password) => {
  let emailError = this.emailField(email);
  if (emailError === undefined)
    emailError = await this.checkEmailAvailability(email);

  let usernameError = this.usernameField(username);
  if (usernameError === undefined)
    usernameError = await this.checkUsernameAvailability(username);

  const passwordError = await this.passwordField(password);

  const result = [];
  if (emailError !== undefined) result.push(emailError);
  if (usernameError !== undefined) result.push(usernameError);
  if (passwordError !== undefined) result.push(passwordError);
  if (result.length !== 0) {
    throw new AppError(result, 400);
  }
};

exports.passwordField = (password) => {
  if (password === undefined)
    return { field: "password", message: "The password is required." };
  return undefined;
};
exports.passwordValidity = async (userPassword, hashedPassword = undefined) => {
  if (!(await bcrypt.compare(userPassword, hashedPassword)))
    throw new AppError(
      {
        field: "password",
        message: "The password is Wrong.",
      },
      401,
    );
  return {};
};

exports.emailField = (email) => {
  if (email === undefined)
    return { field: "email", message: "Email field is required" };
  return undefined;
};

exports.checkEmailAvailability = async (email) => {
  const query = `SELECT ID FROM USERS WHERE EMAIL = '${email}'`;
  const [[data]] = await connection.query(query);
  let result;
  if (data !== undefined) {
    result = { field: "email", message: "The email is already exist" };
  }
  return result;
};

exports.usernameField = (username) => {
  if (username === undefined || username.length === 0)
    return { field: "username", message: "Username field is required" };
  return undefined;
};

exports.checkUsernameAvailability = async (username) => {
  const query = `SELECT ID FROM USERS WHERE USERNAME = '${username}'`;
  const [data] = await connection.query(query);

  let result;
  if (data.length !== 0) {
    result = { field: "username", message: "Username is already used" };
  }
  return result;
};

exports.createToken = (id, res) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 30 * 60,
  });
  res.cookie("token", token);
};

exports.adminPermission = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token === "null")
      throw new AppError(
        "Unauthorized access. Please check your credentials and try again.",
        403,
      );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = await UserModel.getRole(decoded.id);

    if (role === "user")
      throw new AppError(
        "Unauthorized access. Please check your credentials and try again.",
        403,
      );

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({
        status: "error",
        data: null,
        message:
          "Unauthorized access. Please check your credentials and try again.",
      });
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};
