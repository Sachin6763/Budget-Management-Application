<h1 align="center">Budget Management Application</h1>

The Budget Management Application is a web-based tool designed to help users manage their finances effectively. This application incorporates predictive analytics to provide users with personalized insights and recommendations for better financial planning.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Managing personal finances can be challenging, especially without proper tools and insights. The Budget Management Application aims to address this challenge by providing users with a comprehensive platform to track income, expenses, savings, and financial goals. With the integration of predictive analytics, users can anticipate future expenses and make informed decisions to achieve their financial objectives.

## Features

- **User Authentication**: Secure user registration and login system.
- **Financial Data Input**: Easily input income, expenses, and financial goals.
- **Expense Tracking and Analysis**: Real-time tracking of expenses with detailed analysis.
- **Goal-Based Savings**: Set and track savings goals with automated contributions.
- **Predictive Analytics**: Predict future expenses based on spending patterns.
- **Budget Reports and Forecasts**: Generate detailed reports and forecasts for better planning.
- **Data Encryption and Security**: Ensures user data privacy and security through encryption and secure storage.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQL
- **Plotting** : react-plotly, recharts

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd budget-management-app`

3. **Frontend Installation:**

- **Navigate to the frontend directory:**
  ```
  cd frontend
  ```
- **Install dependencies:**
  ```
  npm install
  ```

4. **Backend Installation:**

- **Navigate to the backend directory:**
  ```
  cd ../backend
  ```
- **Install dependencies:**
  ```
  npm install
  ```

5. **Additional Libraries for Plotting:**

- **Navigate back to the frontend directory:**
  ```
  cd ../frontend
  ```
- **Install react-plotly:**
  ```
  npm install react-plotly
  ```
- **Install recharts:**
  ```
  npm install recharts
  ```

By following these steps, you will have installed all the necessary dependencies for both the frontend and backend of the budget management application. Additionally, the required libraries for plotting will be installed in the frontend directory.

## Usage

1. Start the backend server: `nodemon server.js` (Note : install nodemon if not)
2. Start the frontend development server: `npm start`
3. Access the application in your web browser at `http://localhost:3000`

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or new features.

## License

[License](LICENSE)
