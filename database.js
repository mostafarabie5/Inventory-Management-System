const mysql = require("mysql2");
const databaseConfig = require("./database.config");

const connection = mysql
  .createConnection({
    host: databaseConfig.host,
    password: databaseConfig.password,
    user: databaseConfig.user,
    database: databaseConfig.name,
    port: databaseConfig.port,
  })
  .promise();
(async () => {
  try {
    await connection.connect();
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = connection;
