const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nhatthien88",
  database: "mydb",
});

mysqlPool
  .query("select * from sinhvien")
  .then((data) => console.log(data))
  .catch((err) => console.log("connect db fail! \n" + err));

module.exports = mysqlPool;
