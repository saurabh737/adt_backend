var mysql = require('mysql');
let mysql_services = require("../utils/db.js").services;
let runtime = {
    db: {}
};

module.exports.init = async () => {
    console.log("Connecting to mysql")
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: 'root',
        password: 'root@123',
        database: 'cooking_made_easy'
    });
    mysql_services.initMysqlPool(pool)
    console.log("Successfully connected to MySql")
}