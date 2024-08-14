const authController = require("./authController");
const UserModel = require("../Models/userModel");
const AppError = require("../utils/appError");

exports.register = async (req, res) => {
  try {
    await authController.registrationValidation(
      req.body.email,
      req.body.username,
      req.body.password,
    );
    const user = new UserModel(
      req.body.username,
      req.body.email,
      req.body.password,
    );

    await user.addUser();

    await authController.createToken(user.id, res);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: { user: user },
      message: "Account created successfully!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: JSON.parse(err.message),
    });
  }
};

exports.login = async (req, res) => {
  try {
    const usernameField = authController.usernameField(req.body.username);
    const passwordField = authController.passwordField(req.body.password);

    const validation = [];
    if (usernameField !== undefined) validation.push(usernameField);
    if (passwordField !== undefined) validation.push(passwordField);

    if (validation.length !== 0) throw new AppError(validation, 400);

    const user = new UserModel(req.body.username, undefined, req.body.password);

    const hashedPassword = await user.logUser();

    await authController.passwordValidity(user.password, hashedPassword);

    authController.createToken(user.id, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        user,
      },
      message: "Login Successfully!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: JSON.parse(err.message),
    });
  }
};
