import os, random, datetime, requests,openpyxl
import pandas as pd
import matplotlib.pyplot as plt
from flask import Flask, render_template

app = Flask(__name__)

# Define a folder containing your images
IMAGE_FOLDER = 'static/images/'
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER

# List all image filenames in the folder
image_filenames = os.listdir(IMAGE_FOLDER)

def get_greeting():
    current_time = datetime.datetime.now().time()
    my_name = 'JC!'
    if current_time.hour < 12:
        return "Good morning" + ', ' + my_name
    elif current_time.hour < 18:
        return "Good afternoon" + ', ' + my_name
    else:
        return "Good evening" + ', ' + my_name

def get_quote():
    api_url = "https://zenquotes.io/api/today"
    response = requests.get(api_url)
    data = response.json()
    quote = data[0]['q']
    return quote

def get_author():
    api_url = "https://zenquotes.io/api/today"
    response = requests.get(api_url)
    data = response.json()
    author = data[0]['a']
    return author

# def generate_charts():


@app.route('/')
def index():
    random_image = random.choice(image_filenames)
    image_path = os.path.join(app.config['IMAGE_FOLDER'], random_image)
    greeting = get_greeting()
    quote = "\"" + get_quote() + "\""
    author = "~" + get_author()
    return render_template('index.html', image_path=image_path, greeting=greeting, quote=quote, author=author)



if __name__ == '__main__':
    app.run(debug=True)
