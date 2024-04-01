const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sachin@6763",
  database: "connect",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
  // Your code here
});

connection.query(
  "CREATE table IF NOT EXISTS server( id int, name varchar(50));",
  (err, results, fields) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return;
    }
    // Process the query results
    console.log("Query results: ", results);
  }
);
