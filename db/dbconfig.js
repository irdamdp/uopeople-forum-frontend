const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

// dbconnenction.execute("select 'test' ", (err, results, fields) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Database connection successful:", results);
// });

module.exports = dbconnection.promise();
