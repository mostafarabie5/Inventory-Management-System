const connection = require("../database");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res) => {
  try {
    const [result] = await connection.query(
      "SELECT ID,USERNAME,EMAIL,PASSWORD,ROLE FROM USERS",
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [{ affectedRows }] = await connection.query(
      `DELETE FROM USERS WHERE ID = ${id};`,
    );

    if (affectedRows === 0)
      throw new AppError(`There is no user with ID = ${id}`, 404);

    res.status(204).json({
      status: "success",
      requestedAT: req.requestedAT,
      message: "The user is deleted successfully",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};

exports.giveAdminPermission = async (req, res) => {
  try {
    const { id } = req.params;

    const [[user]] = await connection.query(
      `SELECT id,username,email,role FROM USERS WHERE ID = ${id}`,
    );
    if (user === undefined)
      throw new AppError(`There is no user with ID = ${id}`, 404);

    const [{ changedRows }] = await connection.query(
      `UPDATE USERS SET ROLE = 'admin' WHERE ID = ${id};`,
    );
    if (changedRows === 0)
      throw new AppError(`The user is already admin.`, 404);

    user.role = "admin";

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};

exports.removeAdminPermission = async (req, res) => {
  try {
    const { id } = req.params;

    const [[user]] = await connection.query(
      `SELECT id,username,email,role FROM USERS WHERE ID = ${id}`,
    );

    if (user === undefined)
      throw new AppError(`There is no user with ID = ${id}`, 404);

    const [{ changedRows }] = await connection.query(
      `UPDATE USERS SET ROLE = 'user' WHERE ID = ${id};`,
    );

    if (changedRows === 0)
      throw new AppError(`There user is already regular user.`, 404);

    user.role = "user";

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      requestedAt: req.requestedAt,
      message: err.message,
    });
  }
};
