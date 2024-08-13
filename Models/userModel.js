const bcrypt = require("bcrypt");
const connection = require("../database");

class User {
  constructor(userName, email, password, role = "user") {
    this.id = undefined;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async addUser() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;

    const query = `INSERT INTO USERS (USERNAME,EMAIL,PASSWORD) VALUES ('${this.userName}','${this.email}','${this.password}'); `;

    const [result] = await connection.query(query);

    this.id = result.insertId;
    this.password = undefined;
  }

  async logUser() {
    const query = `SELECT id, username, email, password, role FROM USERS WHERE USERNAME = '${this.userName}'; `;

    const [[result]] = await connection.query(query);

    if (result === undefined)
      // eslint-disable-next-line no-throw-literal
      throw {
        field: "username",
        message: `No account found with that username `,
      };

    this.id = result.id;
    this.email = result.email;
    this.role = result.role;

    return result.password;
  }

  static async getRole(id) {
    const query = `SELECT role FROM USERS WHERE ID = ${id}`;
    const [[role]] = await connection.query(query);

    return role;
  }
}

module.exports = User;
