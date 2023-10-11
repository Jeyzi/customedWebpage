import os
import random
import datetime
import requests
from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# Define the path to the migrations directory
MIGRATION_DIR = os.path.join(app.root_path, 'migrations')

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db, directory=MIGRATION_DIR)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)

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

@app.route('/')
def index():
    random_image = random.choice(image_filenames)
    image_path = os.path.join(app.config['IMAGE_FOLDER'], random_image)
    greeting = get_greeting()
    quote = "\"" + get_quote() + "\""
    author = "~" + get_author()
    tasks = Task.query.all()
    return render_template('index.html', image_path=image_path, greeting=greeting, quote=quote, author=author, tasks=tasks)


@app.route('/add_task', methods=['POST'])
def addTask():
    data = request.get_json()

    if 'content' in data:
        task_content = data['content']
        if task_content.strip():  # Check if the content is not empty or only whitespace
            new_task = Task(content=task_content)
            db.session.add(new_task)
            db.session.commit()
            return jsonify(success=True)
        else:
            return jsonify(success=False, error='Task content cannot be empty or whitespace')
    return jsonify(success=False, error='Content field not found in request data')

@app.route('/save_tasks', methods=['POST'])
def saveTasks():
    data = request.get_json()
    # Clear existing tasks in the database
    Task.query.delete()
    if data:
        for task_data in data:
            task_content = task_data.get('content')
            task_completed = task_data.get('completed')
            new_task = Task(content=task_content, completed=task_completed)
            db.session.add(new_task)
    db.session.commit()
    return jsonify(success=True)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
