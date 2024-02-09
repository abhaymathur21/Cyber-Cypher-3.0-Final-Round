from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import pandas as pd
import json

with open(r"C:\Users\a21ma\OneDrive\Desktop\Cyber Cypher 3.0 (Final Round)\data\orders.json", "r") as file:
    orders = json.load(file)

transactions = []
for order in orders:
    products = [str(product['id']) for product in order['products']]
    transactions.append(products)

encoder = TransactionEncoder()
encoder_array = encoder.fit(transactions).transform(transactions)

df_encoded = pd.DataFrame(encoder_array, columns=encoder.columns_)

frequent_itemsets = apriori(df_encoded, min_support=0.01, use_colnames=True)

rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)

def recommend_items(user_input, rules):
    recommendations = set()
    user_input = [str(user_input)]
    for item in user_input:
        related_rules = rules[rules['antecedents'].apply(lambda x: item in x)]
        for _, row in related_rules.iterrows():
            recommendations.update(row['consequents'])
    return recommendations



# Example usage:
# user_input = ['1', '3']  # User provides a list of items they have purchased
# recommended_items = recommend_items(user_input, rules)
# print("Recommended items based on your input:")
# for item in recommended_items:
#     print(f"Item ID: {item}")

