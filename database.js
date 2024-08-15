const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: process.env.HOSTNAME,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
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
