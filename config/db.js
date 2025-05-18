const mysql = require("mysql2");
require("dotenv").config();

var hostname = process.env.DB_HOST;
var database = process.env.DB_NAME;
var port = process.env.PORT;
var username = process.env.DB_USER;
var password = process.env.DB_PASSWORD;

var connection = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
});

module.exports = connection;
