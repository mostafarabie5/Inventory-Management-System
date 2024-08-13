const connection = require("../database");

exports.getAllUsers = async (req, res) => {
  const [result] = await connection.query(
    "SELECT ID,USERNAME,EMAIL,PASSWORD,ROLE FROM USERS",
  );
  res.status(200).json(result);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await connection.query(`DELETE FROM USERS WHERE ID = ${id};`);
  res.status(200).json("Done");
};

exports.giveAdminPermission = async (req, res) => {
  const { id } = req.params;
  await connection.query(`UPDATE USERS SET ROLE = 'admin' WHERE ID = ${id};`);
  res.status(200).json("Done");
};

exports.removeAdminPermission = async (req, res) => {
  const { id } = req.params;
  await connection.query(`UPDATE USERS SET ROLE = 'user' WHERE ID = ${id};`);
  res.status(200).json("Done");
};
