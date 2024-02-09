from uagents import Agent, Context, Model
from uagents.query import query
from uagents.setup import fund_agent_if_low
import requests
import json
import csv
import math

json_file_path = 'data/products.json'
csv_file_path = 'data/products.csv'
json_file_path2 = 'data/stock_predictions.json'

#Reading the data from the json file:
with open(json_file_path, 'r') as json_file:
    database_response = json.load(json_file)
# print(database_response[0])
    

with open(json_file_path2, 'r') as json_file:
    stock_predictions = json.load(json_file)
# print(stock_predictions)


class Message(Model):
    product: str
    quantity: str

database_agent = Agent(
    name="database_agent",
    seed="database_agent_seed",
    port=8000,
    endpoint=["http://127.0.0.1:8000/submit"],
)

# print(database_agent.address)

@database_agent.on_message(model=Message)
async def handle_message(ctx:Context,sender:str, msg: Message):
    
    input_names_with_size = msg.product.split(', ')
    input_names = [name.split(' -')[0] for name in input_names_with_size]
    input_quantities = msg.quantity.split(', ')
    # print(input_names,input_sizes,input_quantities)
    
    for data in database_response:
        # print(data)
        
        data_name_lower=data['name'].lower()
        data_quantity = int(data['stock'])
        data_id = data['id']        
        
        for i in range(len(input_names)):
            
            input_name_lower=input_names[i].lower()
            input_quantity = int(input_quantities[i])
            
            if data_name_lower == input_name_lower and data_quantity >= input_quantity:
                print(f'{input_quantity} of {input_names[i]}(id:{data_id}) was bought')
                
                for prediction in stock_predictions:
                    if prediction["id"] == data_id:
                        predicted_product_stock = prediction["predicted_quantity"]
                        break
                # print(predicted_product_stock)
                
                min_stock = math.ceil(0.25 * predicted_product_stock) # month 1 because it is currently january so we are using predictions for this month
                
                
                # if data_quantity < min_stock:
                #     # print('Low stock before buying')
                #     await ctx.send("agent1qfhsacmleeygp9qhpnsyjnsmj36el3far8k6vpep5t8uuxupnhus7t40wv8", Message(product=input_names_with_size[i],quantity=data['Quantity'])) #goes to alert agent
                    
                newQuantity = data_quantity - input_quantity
                data['stock'] = newQuantity
                
                restock_quantity = math.ceil(predicted_product_stock - newQuantity)
                
                # Updating the json file:
                with open(json_file_path, 'w') as json_file:
                    json.dump(database_response, json_file, indent=2)
                
                    
                # Reading the csv file:
                with open(csv_file_path, 'r', encoding='utf-8-sig') as csv_file:
                    csv_reader = csv.DictReader(csv_file)
                    csv_data = list(csv_reader)
                    
                    
                # Updating csv values
                for csv_data_row in csv_data:
                    # print(csv_data_row)
                    if int(csv_data_row["id"]) == data_id:
                        csv_data_row["stock"] = newQuantity
                
                with open(csv_file_path, 'w', newline='') as csv_file:
                    fieldnames = ["id","name","price","description","category","brand","stock"]
                    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

                    # Write the header
                    csv_writer.writeheader()

                    # Write the updated data
                    csv_writer.writerows(csv_data)
                
                print("New Quantity: ",data['stock']) 
                if data['stock'] < min_stock:
                    # print('Low stock after buying')
                    await ctx.send("agent1qfhsacmleeygp9qhpnsyjnsmj36el3far8k6vpep5t8uuxupnhus7t40wv8", Message(product=input_names_with_size[i],quantity=restock_quantity)) # goes to alert agent




if __name__ == "__main__":
    fund_agent_if_low(database_agent.wallet.address())
    database_agent.run()

