const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee"
});

const dbPromise = db.promise();

module.exports = dbPromise;