CREATE DATABASE BudgetManagementApplicationDatabase ; 

-- DROP DATABASE IF EXISTS DMS; 

USE BudgetManagementApplicationDatabase ; 

CREATE TABLE User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ExpenseCategory (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IncomeCategory (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL UNIQUE 
);

CREATE TABLE Expense (
    ExpenseID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ExpenseName VARCHAR(255) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    ExpenseDate DATE NOT NULL,
    CategoryID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CategoryID) REFERENCES ExpenseCategory(CategoryID)
);

CREATE TABLE FinancialGoal (
    GoalID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    GoalName VARCHAR(255) NOT NULL,
    TargetAmount DECIMAL(10, 2) NOT NULL,
    Deadline DATE NOT NULL,
    Status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Income (
    IncomeID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    IncomeName VARCHAR(255) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    IncomeDate DATE NOT NULL,
    CategoryID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CategoryID) REFERENCES IncomeCategory(CategoryID)
);
