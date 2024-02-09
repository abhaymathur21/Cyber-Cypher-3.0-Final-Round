"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""
from uagents.query import query
from uagents import Model


class Message(Model):
    product: str
    quantity: str
    

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

# input_text = input("Enter the text: ")

async def llm_model(input_string, products_data):
  
  classification_prompt = [
          f'''
          From the text provided, figure out whether it is a text where the user is placing an order for an item or whether the user is asking for a recommendation for something to buy based on an item they provide. 
          Only respond in 'order' or 'recommendation' based on the text provided. The text to be used is: {input_string}
          '''
      ]
      
  response = model.generate_content(classification_prompt)
  
  if response.text == 'order':
        order_prompt = [
        f'''
        Extract the item to be bought and its quantity from the text that will be provided and then give a string output with only the item separated from just the numeric value of the quantity using a comma. The output string must not contain anything but the item name and quantity value. The text to be used is: {input_string}'''
        ]
        
        response = model.generate_content(order_prompt)
        print(response.text)
        product, quantity = response.text.split(',')
        await query(destination='agent1qgmvuf8wuv96ypmsptary360n8qghm80yw0tv39qqk4d5nepgudxzskzqqm',message=Message(product=product,quantity=quantity)) # goes to input agent
        processed_result = f"You have successfully bought: {product} and the quantity is {quantity}"
        return str(processed_result)
  
  elif response.text == 'recommendation':
      recommendation_prompt = [
      f'''
      {products_data}
      
      Given the above product data, give ONLY product name and id of the product that you recommend the user to buy. Give it in a string format where the id is separated by the name by '-' and id comes first. The given user input: {input_string}
      '''
      ]
      
      response = model.generate_content(recommendation_prompt)
      print(response.text)
      return str(response.text)

  else:
      return "Invalid response"

# prompt_parts = [
#   f"Extract the item to be bought and its quantity from the text that will be provided and then give a string output with only the item separated from just the numeric value of the quantity using a comma. The output string must not contain anything but the item name and quantity value. The text to be used is: {input_text}"
# ]

# response = model.generate_content(prompt_parts)
# print(response.text)
# product, quantity = response.text.split(',')