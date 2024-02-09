import pandas as pd
import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import LSTM, Dense

data = pd.read_json(r"C:\Users\a21ma\OneDrive\Desktop\Cyber Cypher 3.0 (Final Round)\data\orders.json").to_dict(orient="records")
data = pd.json_normalize(data, "products", ["order_id", "date"])
data["date"] = pd.to_datetime(data["date"])
data["month"] = (data["date"] - pd.to_datetime("2023-01-01")).dt.days // 30 + 1
data = data.drop("date", axis=1)
data = data.groupby(["id", "month"]).sum().reset_index()

# Prepare data for LSTM
# sequence_length = 3  # Choose an appropriate sequence length
# X, y = [], []

# for i in range(len(data) - sequence_length):
#     X.append(data.iloc[i : i + sequence_length][["id", "month"]].values)
#     y.append(data.iloc[i + sequence_length]["quantity"])

# X, y = np.array(X), np.array(y)

X, y = data[["id", "month"]], data["quantity"].values

# One-hot encode the input features
encoder = OneHotEncoder(sparse_output=False)
transformer = ColumnTransformer([("onehot", encoder, [0])], remainder="passthrough")
X = transformer.fit_transform(X)
X = X.reshape(-1, 1, X.shape[1])

print(X)

# Normalize the target variable
y = np.log10(y)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# Define the LSTM model
model = Sequential()
model.add(LSTM(units=50, activation="relu", input_shape=(1, X.shape[2])))
model.add(Dense(units=1, activation="linear"))
model.compile(optimizer="adam", loss="mean_squared_error")

# Train the model
model.fit(
    X,
    y,
    epochs=50,
    batch_size=32,
    validation_data=(X_test, y_test),
    verbose=1,
)


# Make predictions

next_month = data["month"].max() + 1
X_pred = data["id"].unique()
X_pred = pd.DataFrame(X_pred, columns=["id"])
X_pred["month"] = next_month

X_pred = transformer.transform(X_pred)
X_pred = X_pred.reshape(-1, 1, X_pred.shape[1])

predictions = model.predict(X_pred)
predictions = np.power(10, predictions)
predictions = np.ceil(predictions)
predictions = np.abs(predictions)

# Evaluate the model
mse = mean_squared_error(y_test, model.predict(X_test))
print(f"Mean Squared Error: {mse}")
print(f"Prediction: {predictions}")

predictions = predictions.reshape(-1)
# Convert predictions to a DataFrame
predictions_df = pd.DataFrame({"id": data["id"].unique(), "predicted_quantity": predictions.astype(int)})
print(predictions_df)
predictions_df.to_csv("stock_predictions.csv", index=False)

print("Predictions saved to predictions.csv")
