from flask import Flask, request, render_template, jsonify
from uagents.query import query
from uagents import Model
from flask_cors import CORS
import json
import google.generativeai as genai

genai.configure(api_key="AIzaSyAICt3N6_7M5k1rabLvPESlCixWHyzsq6o")
# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


class Message(Model):
    product: str
    quantity: str
    

app = Flask(__name__)
CORS(app)

json_file_path = r'C:\Users\a21ma\OneDrive\Desktop\Cyber Cypher 3.0 (Final Round)\data\products.json'

# Reading the data from the json file:
with open(json_file_path, 'r') as json_file:
    products_data = json.load(json_file)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET', 'POST'])
async def frontend_input():
    if request.method== 'POST':
        data = request.json
        product = data.get('product')
        quantity = data.get('quantity')
        await query(destination='agent1qgmvuf8wuv96ypmsptary360n8qghm80yw0tv39qqk4d5nepgudxzskzqqm',message=Message(product=product,quantity=quantity)) # goes to input agent
        processed_result = f"You have successfully bought: {product} and the quantity is {quantity}"
        return processed_result
    return processed_result   

@app.route('/product-suggestions', methods=['GET'])
def product_suggestions():
    input_text = request.args.get('input', '')

    # Filter suggestions based on the input_text from the loaded products data
    # print(product['name'] for product in products_data)
    filtered_suggestions = [
        {"name": product['name']}
        for product in products_data
        if isinstance(product, dict) and 'name' in product and product['name'].lower().startswith(input_text.lower())
    ]
    return jsonify(filtered_suggestions)

@app.route('/products', methods=['GET','POST'])
def products():
    if request.method == 'GET':

        return jsonify(products_data)
    
    if request.method == 'POST':
        data = request.get_json()
        
        # Updating the json file:
        with open(json_file_path, 'w') as json_file:
            json.dump(data, json_file, indent=2)
        
        # print(product, quantity)
        return jsonify({"message": "Data updated successfully"})
    
@app.route('/database', methods=['GET','POST'])
def database():
    if request.method == 'GET':
        return render_template('database.html',data=products_data)
    
    if request.method == 'POST':
        data = request.get_json()
        
        # Updating the json file:
        with open(json_file_path, 'w') as json_file:
            json.dump(data, json_file, indent=2)
        
        # print(product, quantity)
        return jsonify({"message": "Data updated successfully"})
        
@app.route('/send_string', methods=['POST'])
async def send_string():
    # Get the string input from the request body
    data = request.get_json()
    input_string = data.get('string')

    # Process the string input as needed
    # For example, you can print it to the console
    print('Received string:', input_string)
    
    # input_text = input("Enter the text: ")

    prompt_parts = [
    f"Extract the item to be bought and its quantity from the text that will be provided and then give a string output with only the item separated from just the numeric value of the quantity using a comma. The output string must not contain anything but the item name and quantity value. The text to be used is: {input_string}"
    ]

    response = model.generate_content(prompt_parts)
    print(response.text)
    product, quantity = response.text.split(',')

    # You can also perform any other operations here

    # Return a response (optional)
    await query(destination='agent1qgmvuf8wuv96ypmsptary360n8qghm80yw0tv39qqk4d5nepgudxzskzqqm',message=Message(product=product,quantity=quantity)) # goes to input agent
    processed_result = f"You have successfully bought: {product} and the quantity is {quantity}"    
    return processed_result   

if __name__ == '__main__':
    app.run(debug=True)