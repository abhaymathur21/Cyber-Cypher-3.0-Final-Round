import pandas as pd
import numpy as np
from random import randint
from datetime import datetime, timedelta
import sys


url = "https://api.vercel.app/products"

data = pd.read_json(url)


def sigmoid(x, a=1):
    return 1 / (1 + np.exp(-a * x))


def generate_orders(data, n=100):
    start = datetime(2023, 1, 1)
    end = datetime(2024, 3, 1)
    day_range = (end - start).days
    p = np.random.normal(0, 0.25, len(data["id"]))
    p = np.exp(p) / np.exp(p).sum()

    print(p)

    orders = [
        {
            "order_id": i + 1,
            "date": (
                start
                + timedelta(
                    days=min(
                        [
                            np.random.poisson(day_range * sigmoid(i / n - 0.5, 5)),
                            day_range,
                        ]
                    )
                )
            ).strftime("%Y-%m-%d"),
            "products": [
                {
                    "id": np.random.choice(data["id"], p=p),
                    "quantity": randint(1, 25),
                }
                for _ in range(np.random.poisson(3))
            ],
        }
        for i in range(n)
    ]

    orders = pd.DataFrame(orders)
    month = (
        pd.to_datetime(orders["date"]) - pd.to_datetime("2023-01-01")
    ).dt.days // 30 + 1
    orders = orders.drop(index=orders[month > 12].index)
    orders = orders.sort_values("date")

    orders = orders.to_dict(orient="records")
    return orders


n = int(sys.argv[1])

orders = generate_orders(data, n=n)

data = pd.DataFrame(orders)
data.to_json("orders.json", orient="records", indent=2)

print(f"Generated {n} orders")

data = pd.json_normalize(orders, "products", ["order_id", "date"])
data["date"] = pd.to_datetime(data["date"])
data["month"] = (data["date"] - pd.to_datetime("2023-01-01")).dt.days // 30 + 1
data = data.drop("date", axis=1)
data = data.groupby(["id", "month"]).sum().reset_index()
data = data.pivot(index="id", columns="month", values="quantity").fillna(0).astype(int)

print(data)
