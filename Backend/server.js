const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const { get } = require("https");

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sachin@6763",
  database: "dms",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the root public folder of your React app
app.use(express.static(path.join(__dirname, "../Frontend/public")));

const updateGoalStatus = async () => {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date
    const query =
      "SELECT * FROM FinancialGoal WHERE Status = 'Pending' AND Deadline < ?";
    connection.query(query, [currentDate], (error, results) => {
      if (error) {
        console.error("Error updating goal status:", error);
      } else {
        results.forEach((goal) => {
          const updateQuery =
            "UPDATE FinancialGoal SET Status = 'Failed' WHERE GoalID = ?";
          connection.query(updateQuery, [goal.GoalID], (error) => {
            if (error) {
              console.error("Error updating goal status:", error);
            }
          });
        });
      }
    });
  } catch (error) {
    console.error("Error updating goal status:", error);
  }
};

// Schedule the background task to run once a day at midnight
cron.schedule("0 0 * * *", updateGoalStatus); // Runs every day at midnight

const bcrypt = require("bcrypt");

app.post("/api/signup", async (req, res) => {
  const { UserID, Password, Email } = req.body;
  // console.log(UserID, Password, Email);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

    // Check if the email is already registered
    const emailCheckQuery = `SELECT * FROM user WHERE Email = ?`;
    connection.query(
      emailCheckQuery,
      [Email],
      async (emailError, emailResults) => {
        if (emailError) {
          console.error("Error checking email: " + emailError.stack);
          res.status(500).json({ error: "Error checking email" });
        } else if (emailResults.length > 0) {
          // Email already exists, send an error response
          res.status(400).json({ error: "Email is already taken" });
        } else {
          // Email is unique, check if the UserID is unique
          const userIDCheckQuery = "SELECT * FROM user WHERE Username = ?";
          connection.query(
            userIDCheckQuery,
            [UserID],
            async (userIDError, userIDResults) => {
              if (userIDError) {
                console.error("Error checking UserID: " + userIDError.stack);
                res.status(500).json({ error: "Error checking UserID" });
              } else if (userIDResults.length > 0) {
                // UserID already exists, send an error response
                res.status(400).json({ error: "Username is already taken" });
              } else {
                // UserID is also unique, proceed with registration
                const insertQuery =
                  "INSERT INTO user (Username, Password, Email) VALUES (?, ?, ?)";
                connection.query(
                  insertQuery,
                  [UserID, hashedPassword, Email],
                  (insertError, insertResults) => {
                    if (insertError) {
                      console.error(
                        "Error executing query: " + insertError.stack
                      );
                      res.status(500).json({ error: "Error registering user" });
                    } else {
                      res.json({ message: "User registered successfully" });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Error hashing password" });
  }
});

app.post("/api/login", async (req, res) => {
  const { userID, password } = req.body;
  // console.log(userID, password); // Ensure you're receiving the correct values

  try {
    const query = `SELECT * FROM user WHERE Username = ?`;
    connection.query(query, [userID], async (error, results) => {
      if (error) {
        console.error("Error executing query: " + error.stack);
        res.status(500).json({ error: "Error logging in" });
      } else {
        if (results.length > 0) {
          const user = results[0];
          // Compare the provided password with the hashed password from the database
          const match = await bcrypt.compare(password, user.Password);
          if (match) {
            // Passwords match, send a success response
            res.json({ message: "Login successful" });
          } else {
            // Passwords do not match, send an error response
            res.status(401).json({ error: "Invalid username or password" });
          }
        } else {
          // User not found, send an error response
          res.status(401).json({ error: "Invalid username or password" });
        }
      }
    });
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).json({ error: "Error comparing passwords" });
  }
});

const getUserIDByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const getUserIDQuery = `SELECT UserID FROM User WHERE Username = ?`;
    connection.query(getUserIDQuery, [username], (error, results) => {
      if (error) {
        // Handle the error by rejecting the promise with the error object
        console.error("Error getting UserID: " + error.stack);
        reject(error);
      } else {
        if (results.length > 0) {
          const UserID = results[0].UserID;
          resolve(UserID);
        } else {
          // If no user found, reject the promise with a custom error message
          reject("User not found");
        }
      }
    });
  });
};

const getExpenseCategoryIDByCategoryName = (CategoryName) => {
  return new Promise((resolve, reject) => {
    const getUserIDQuery = `SELECT CategoryID FROM ExpenseCategory WHERE CategoryName = ?`;
    connection.query(getUserIDQuery, [CategoryName], (error, results) => {
      if (error) {
        console.error("Error getting CategoryID: " + error.stack);
        reject("Error getting CategoryID");
      } else {
        // console.log("here2", results);
        if (results.length > 0) {
          // User found, send the CategoryID in response
          const CategoryID = results[0].CategoryID;
          // console.log(CategoryID);
          resolve(CategoryID);
        } else {
          // User not found, send an error response
          reject("Category not found");
        }
      }
    });
  });
};

const getIncomeCategoryIDByCategoryName = (CategoryName) => {
  return new Promise((resolve, reject) => {
    const getUserIDQuery = `SELECT CategoryID FROM IncomeCategory WHERE CategoryName = ?`;
    connection.query(getUserIDQuery, [CategoryName], (error, results) => {
      if (error) {
        console.error("Error getting CategoryID: " + error.stack);
        reject("Error getting CategoryID");
      } else {
        // console.log("here2", results);
        if (results.length > 0) {
          // User found, send the CategoryID in response
          const CategoryID = results[0].CategoryID;
          // console.log(CategoryID);
          resolve(CategoryID);
        } else {
          // User not found, send an error response
          reject("Category not found");
        }
      }
    });
  });
};

// Handle adding an expense
app.post("/api/addExpense", (req, res) => {
  const { username, expensename, amount, date, category } = req.body;

  // Get UserID by username
  getUserIDByUsername(username)
    .then((UserID) => {
      // Insert expense into database
      const query = `INSERT INTO Expense (UserID, ExpenseName, Amount, ExpenseDate, CategoryID) VALUES (?, ?, ?, ?, ?)`;
      connection.query(
        query,
        [UserID, expensename, amount, date, category],
        (error, results) => {
          if (error) {
            console.error("Error adding expense:", error);
            res.status(500).json({ error: "Error adding expense" });
          } else {
            res.json({ message: "Expense added successfully" });
          }
        }
      );
    })
    .catch((error) => {
      console.error("Error getting UserID:", error);
      res.status(500).json({ error: "Error getting UserID" });
    });
});

app.post("/api/addIncome", (req, res) => {
  const { Username, name, amount, date, category } = req.body;
  // console.log(req.body);
  // Get UserID by username
  getUserIDByUsername(Username)
    .then((UserID) => {
      // console.log(UserID);
      // Insert income into database
      const query = `INSERT INTO Income (UserID, IncomeName, Amount, IncomeDate, CategoryID) VALUES (?, ?, ?, ?, ?)`;
      connection.query(
        query,
        [UserID, name, amount, date, category],
        (error, results) => {
          if (error) {
            console.error("Error adding income:", error);
            res.status(500).json({ error: "Error adding income" });
          } else {
            res.json({ message: "Income added successfully" });
          }
        }
      );
    })
    .catch((error) => {
      console.error("Error getting UserID:", error);
      res.status(500).json({ error: "Error getting UserID" });
    });
});

// Handle fetching all category names
app.get("/api/expensecategories", (req, res) => {
  // Query to retrieve all category names
  const query = "SELECT CategoryName FROM ExpenseCategory";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories: " + error.stack);
      res.status(500).json({ error: "Error fetching categories" });
    } else {
      // Extract category names from the query results
      const categories = results.map((result) => result.CategoryName);
      res.json(categories); // Send the category names in the response
    }
  });
});

// Getting categoryID
app.post("/api/expensecategoryid", (req, res) => {
  const { categoryName } = req.body; // Extract category name from request body
  // Query to retrieve category ID based on category name
  const query = "SELECT CategoryID FROM ExpenseCategory WHERE CategoryName = ?";

  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error fetching category ID: " + error.stack);
      res.status(500).json({ error: "Error fetching category ID" });
    } else {
      if (results.length > 0) {
        const categoryId = results[0].CategoryID;
        res.json({ categoryId }); // Send the category ID in the response
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    }
  });
});

// Handle fetching all category names
app.get("/api/incomecategories", (req, res) => {
  // Query to retrieve all category names
  const query = "SELECT CategoryName FROM IncomeCategory";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories: " + error.stack);
      res.status(500).json({ error: "Error fetching categories" });
    } else {
      // Extract category names from the query results
      const categories = results.map((result) => result.CategoryName);
      res.json(categories); // Send the category names in the response
    }
  });
});

// Getting categoryID for income
app.post("/api/incomecategoryid", (req, res) => {
  const { categoryName } = req.body; // Extract category name from request body
  // Query to retrieve category ID based on category name
  const query = "SELECT CategoryID FROM IncomeCategory WHERE CategoryName = ?";

  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error fetching category ID: " + error.stack);
      res.status(500).json({ error: "Error fetching category ID" });
    } else {
      if (results.length > 0) {
        const categoryId = results[0].CategoryID;
        res.json({ categoryId }); // Send the category ID in the response
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    }
  });
});

app.post("/api/expenses_summary", async (req, res) => {
  try {
    const { Username, selectedMonth, selectedYear } = req.body;
    const userID = await getUserIDByUsername(Username);
    // console.log(selectedMonth, "ethe", selectedYear);
    const query = `SELECT CategoryName, SUM(Amount) AS TotalExpense 
               FROM ExpenseCategory 
               LEFT JOIN Expense ON Expense.CategoryID = ExpenseCategory.CategoryID 
               WHERE Expense.UserID = ? 
               AND MONTH(Expense.ExpenseDate) = ? 
               AND YEAR(Expense.ExpenseDate) = ? 
               GROUP BY Expense.CategoryID`;

    connection.query(
      query,
      [userID, selectedMonth, selectedYear],
      (error, results) => {
        if (error) {
          console.error("Error fetching category expenses:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/income_summary", async (req, res) => {
  try {
    const { Username, selectedMonth, selectedYear } = req.body;
    const userID = await getUserIDByUsername(Username);
    // console.log(userID);

    const query = `SELECT CategoryName, SUM(Amount) AS TotalIncome FROM IncomeCategory 
                   LEFT JOIN Income ON Income.CategoryID = IncomeCategory.CategoryID 
                   WHERE Income.UserID = ? 
                   AND MONTH(Income.IncomeDate) = ? 
                   AND YEAR(Income.IncomeDate) = ? 
                   GROUP BY Income.CategoryID`;

    connection.query(
      query,
      [userID, selectedMonth, selectedYear],
      (error, results) => {
        if (error) {
          console.error("Error fetching category expenses:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assuming you're using Express
app.post("/api/addIncomeCategory", async (req, res) => {
  const { categoryName } = req.body;

  // Your code to insert the new category into the database
  // Example:
  const query = "INSERT INTO IncomeCategory (CategoryName) VALUES (?)";
  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error adding income category:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "Income category added successfully" });
  });
});

app.post("/api/addExpenseCategory", async (req, res) => {
  const { categoryName } = req.body;

  // Your code to insert the new category into the database
  // Example:
  const query = "INSERT INTO ExpenseCategory (CategoryName) VALUES (?)";
  connection.query(query, [categoryName], (error, results) => {
    if (error) {
      console.error("Error adding expense category:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "expense category added successfully" });
  });
});

// Endpoint to remove an expense item by ID
app.post("/api/expenses/removeexpenseitem", async (req, res) => {
  try {
    const { expenseCategoryName, Username } = req.body;
    // console.log(Username, expenseCategoryName);
    const UserId = await getUserIDByUsername(Username);
    const expenseCategoryId = await getExpenseCategoryIDByCategoryName(
      expenseCategoryName
    );
    // console.log(UserId, expenseCategoryId);

    // console.log("here");

    // Query to delete the expense item from the database
    const deleteQuery =
      "DELETE FROM Expense WHERE CategoryID=? and UserID=? ; ";
    // Execute the delete query
    connection.query(
      deleteQuery,
      [expenseCategoryId, UserId],
      (error, results) => {
        if (error) {
          console.error("Error removing expense:", error);
          res.status(500).json({ message: "Failed to remove expense" });
        } else {
          res.status(200).json({ message: "Expense removed successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to remove an income item by ID

app.post("/api/incomes/removeincomeitem", async (req, res) => {
  try {
    const { incomeCategoryName, Username } = req.body;
    // console.log(Username, expenseCategoryName);
    const UserId = await getUserIDByUsername(Username);
    const incomeCategoryId = await getIncomeCategoryIDByCategoryName(
      incomeCategoryName
    );
    // console.log(UserId, incomeCategoryId);

    // console.log("here");

    // Query to delete the expense item from the database
    const deleteQuery = "DELETE FROM Income WHERE CategoryID=? and UserID=? ; ";
    // Execute the delete query
    connection.query(
      deleteQuery,
      [incomeCategoryId, UserId],
      (error, results) => {
        if (error) {
          console.error("Error removing expense:", error);
          res.status(500).json({ message: "Failed to remove expense" });
        } else {
          res.status(200).json({ message: "Expense removed successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Goals

// server.js

app.post("/api/addNewGoals", async (req, res) => {
  try {
    const { Username, GoalName, TargetAmount, Deadline } = req.body;

    // Fetch UserID by Username

    // Fetch UserID by Username
    const UserID = await getUserIDByUsername(Username).catch((error) => {
      console.error("Error fetching UserID:", error);
      throw new Error("User not found");
    });

    // Insert new goal into the database
    const query =
      "INSERT INTO FinancialGoal (UserID, GoalName, TargetAmount, Deadline) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [UserID, GoalName, TargetAmount, Deadline],
      (error, results) => {
        if (error) {
          console.error("Error adding goal:", error);
          return res.status(500).json({ message: "Failed to add goal" });
        }
        // If insertion is successful, send a success response
        res.status(201).json({ message: "Goal added successfully" });
      }
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error("Error in adding goals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getPreviousGoals/:Username", async (req, res) => {
  const Username = req.params.Username;
  console.log(Username);
  try {
    const UserID = await getUserIDByUsername(Username);
    const query = "SELECT * FROM FinancialGoal WHERE UserID = ?";
    connection.query(query, [UserID], (error, results) => {
      if (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: "Failed to fetch goals" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching UserID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/discardGoal/:goalID", async (req, res) => {
  const goalID = req.params.goalID;
  try {
    const deleteQuery = "DELETE FROM FinancialGoal WHERE GoalID = ?";
    connection.query(deleteQuery, [goalID], (error, results) => {
      if (error) {
        console.error("Error discarding goal:", error);
        res.status(500).json({ message: "Failed to discard goal" });
      } else {
        res.status(200).json({ message: "Goal discarded successfully" });
      }
    });
  } catch (error) {
    console.error("Error discarding goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/completeGoal/:goalID", async (req, res) => {
  const goalID = req.params.goalID;
  try {
    const updateQuery =
      "UPDATE FinancialGoal SET Status = 'Completed' WHERE GoalID = ?";
    connection.query(updateQuery, [goalID], (error, results) => {
      if (error) {
        console.error("Error completing goal:", error);
        res.status(500).json({ message: "Failed to complete goal" });
      } else {
        res.status(200).json({ message: "Goal completed successfully" });
      }
    });
  } catch (error) {
    console.error("Error completing goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

cron.schedule("0 0 * * *", updateGoalStatus);

app.post("/api/prediction_expense", (req, res) => {
  const { Username } = req.body;
  const sql = `
    SELECT Amount, ExpenseDate, ExpenseID 
    FROM Expense 
    WHERE UserID = (
      SELECT UserID 
      FROM User 
      WHERE Username = ?
    )
  `;
  connection.query(sql, [Username], (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      res.status(500).json({ error: "Error fetching expenses" });
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

app.post("/api/prediction_income", (req, res) => {
  const { Username } = req.body;
  const sql = `
    SELECT Amount, IncomeDate, IncomeID 
    FROM Income 
    WHERE UserID = (
      SELECT UserID 
      FROM User 
      WHERE Username = ?
    )
  `;
  connection.query(sql, [Username], (err, results) => {
    if (err) {
      console.error("Error fetching incomes:", err);
      res.status(500).json({ error: "Error fetching incomes" });
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

// Anamolies

app.get("/api/expense_anomalies", async (req, res) => {
  try {
    const { username } = req.query;
    const userID = await getUserIDByUsername(username);
    const query = `
      SELECT e.ExpenseName, ec.CategoryName AS ExpenseCategory, e.Amount, e.ExpenseDate
      FROM Expense e
      JOIN ExpenseCategory ec ON e.CategoryID = ec.CategoryID
      JOIN (
        SELECT CategoryID, AVG(Amount) AS AvgExpense
        FROM Expense
        WHERE UserID = ${userID}
        GROUP BY CategoryID
      ) AS avg_expenses
      ON e.CategoryID = avg_expenses.CategoryID
      WHERE e.UserID = ${userID} AND e.Amount > 1.5 * avg_expenses.AvgExpense;
    `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching anomalies" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error in fetching anomalies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// income- anamolies

app.get("/api/income_anomalies", async (req, res) => {
  try {
    const { username } = req.query;
    const userID = await getUserIDByUsername(username);
    const query = `
      SELECT i.IncomeName AS Name, ic.CategoryName AS Category, i.Amount, i.IncomeDate AS Date
      FROM Income i
      JOIN IncomeCategory ic ON i.CategoryID = ic.CategoryID
      JOIN (
        SELECT CategoryID, AVG(Amount) AS AvgIncome
        FROM Income
        WHERE UserID = ${userID}
        GROUP BY CategoryID
      ) AS avg_incomes
      ON i.CategoryID = avg_incomes.CategoryID
      WHERE i.UserID = ${userID} AND i.Amount > 1.5 * avg_incomes.AvgIncome;
    `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching income anomalies" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching income anomalies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
