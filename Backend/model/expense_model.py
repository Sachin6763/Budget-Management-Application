# expense_prediction_model.py
import sys
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import json

def train_model_from_server(data):
    # Process the received data and train the model
    print("Received data from server:", data)
    # Convert the received data into a DataFrame
    df = pd.DataFrame(data)
    print(df)
    
    # Convert 'Amount' column to numeric type, handling errors
    df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')
    
    # Convert 'ExpenseDate' column to numeric timestamp
    df['ExpenseDate'] = pd.to_numeric(df['ExpenseDate'], errors='coerce')
    
    # Drop rows with NaN values (if any)
    df = df.dropna()
    
    # Check if there are any samples left after preprocessing
    if df.shape[0] == 0:
        print("No valid samples remaining after preprocessing.")
        return
    
    # Drop unnecessary columns
    df.drop(columns=['ExpenseID', 'ExpenseName'], inplace=True)
    
    # One-hot encode categorical variables
    df = pd.get_dummies(df, columns=['CategoryName'])
    
    # Split data into features (X) and target variable (y)
    X = df.drop(columns=['Amount'])  # Features
    y = df['Amount']  # Target variable
    
    # Initialize and train the Random Forest Regressor model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Save the trained model
    joblib.dump(model, 'expense_prediction_model.pkl')

if __name__ == '__main__':
    # Read data from standard input
    data = json.loads(sys.stdin.read())
    # Train the model using the received data
    train_model_from_server(data)
