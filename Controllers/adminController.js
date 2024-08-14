const connection = require("../database");

exports.getAllUsers = async (req, res) => {
  try {
    const [result] = await connection.query(
      "SELECT ID,USERNAME,EMAIL,PASSWORD,ROLE FROM USERS",
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err); // Log the error details

    res.status(500).json({
      status: "error",
      requestedAt: req.requestedAt,
      message:
        "An error occurred while fetching users. Please try again later.",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`DELETE FROM USERS WHERE ID = ${id};`);
    res.status(200).json("Done");
  } catch (err) {
    console.error("Error fetching users:", err); // Log the error details

    res.status(500).json({
      status: "error",
      requestedAt: req.requestedAt,
      message:
        "An error occurred while fetching users. Please try again later.",
    });
  }
};

exports.giveAdminPermission = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`UPDATE USERS SET ROLE = 'admin' WHERE ID = ${id};`);
    res.status(200).json("Done");
  } catch (err) {
    console.error("Error fetching users:", err); // Log the error details

    res.status(500).json({
      status: "error",
      requestedAt: req.requestedAt,
      message:
        "An error occurred while fetching users. Please try again later.",
    });
  }
};

exports.removeAdminPermission = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query(`UPDATE USERS SET ROLE = 'user' WHERE ID = ${id};`);
    res.status(200).json("Done");
  } catch (err) {
    console.error("Error fetching users:", err); // Log the error details

    res.status(500).json({
      status: "error",
      requestedAt: req.requestedAt,
      message:
        "An error occurred while fetching users. Please try again later.",
    });
  }
};
