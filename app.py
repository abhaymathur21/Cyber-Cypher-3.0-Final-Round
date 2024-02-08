from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def display_products():
    api_url = 'https://api.vercel.app/products'
    response = requests.get(api_url)
    products = response.json()

    return render_template('products.html', products=products)

if __name__ == '__main__':
    app.run()