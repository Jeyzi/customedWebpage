import os
import random
import datetime
import requests
from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  # Use SQLite database
db = SQLAlchemy(app)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)

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

@app.route('/add_task', methods=['POST'])
def addTask():
    data = request.get_json()
    if 'text' in data:
        task_text = data['text']
        new_task = Task(text=task_text)
        db.session.add(new_task)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
@app.route('/get_tasks')
def loadTask():
    tasks = Task.query.all()
    task_texts = [task.text for task in tasks]
    return jsonify(task_texts)

# @app.route('/update_tasks', methods=['POST'])
# def saveData():



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
