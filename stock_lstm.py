import pandas as pd
import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

with open("order.json", "r") as file:
    orders = json.load(file)
    
order_details = []

for order in orders:
    date = order['date']
    
    # Iterate through each item in the order
    for item in order['items']:
        item_id = item['id']
        quantity = item['quantity']
        
        # Append order details to the list
        order_details.append({
            'date': date,
            'item_id': item_id,
            'quantity': quantity
        })

# Create a DataFrame from the list of order details
df = pd.DataFrame(order_details)

# Display the DataFrame
print(df)

df['quantity'] = df['quantity'].abs()
# Preprocess the data
df['date'] = pd.to_datetime(df['date'])
df['month'] = df['date'].dt.month
# Pivot the table to have products as columns, months as rows, and Quantity as values
df_pivot = df.pivot_table(index=['item_id', 'month'], values='quantity', aggfunc='sum').reset_index()

# # Normalize the data
# scaler = MinMaxScaler(feature_range=(0, 1))
# df_normalized = pd.DataFrame(scaler.fit_transform(df_pivot[['Product', 'Month', 'Quantity']]), columns=['Product', 'Month', 'Quantity'])

# Prepare data for LSTM
sequence_length = 2  # Choose an appropriate sequence length
X, y = [], []

for i in range(len(df_pivot) - sequence_length):
    X.append(df_pivot.iloc[i:i + sequence_length][['item_id', 'month']].values)
    y.append(df_pivot.iloc[i + sequence_length]['quantity'])

# X, y = np.array(X), np.array(y)
X,y = df_pivot[['item_id', 'month']].values, df_pivot['quantity'].values
X = X.reshape((-1,1,2))
y = np.log10(y)
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the LSTM model
model = Sequential()
model.add(LSTM(units=50, activation='relu', input_shape=(1,2)))
model.add(Dense(units=1))
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), verbose=1)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')
print(f'Prediction: {predictions}')
