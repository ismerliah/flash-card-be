import mysql, { Connection } from "mysql2/promise";
require("dotenv").config();

let connection: Connection;

const connectMySQL = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      database: process.env.DATABASE,
    });
  }
  return connection;
};

module.exports = {
  connectMySQL,
};
