const authController = require("./authController");
const UserModel = require("../Models/userModel");

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
    if (!("code" in err))
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestedAt,
        data: {
          errors: err,
        },
        message: "Validation failed",
      });

    res.status(504).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const validation = await authController.usernameField(req.body.username);
    if (validation !== undefined) throw validation;

    const user = new UserModel(req.body.username, undefined, req.body.password);

    const hashedPassword = await user.logUser();

    await authController.passwordValidity(user.password, hashedPassword);

    await authController.createToken(user.id, res);

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
    if (!("code" in err))
      res.status(400).json({
        status: "fail",
        requestedAt: req.requestedAt,
        data: {
          errors: err,
        },
        message: "Validation failed",
      });
    else res.status(504).json(err);
  }
};

