import os
import random
import datetime
from flask import Flask, render_template

app = Flask(__name__)

# Define a folder containing your images
IMAGE_FOLDER = 'static/images/'
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER

# List all image filenames in the folder
# image_filenames = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg']
# image_filenames = [filename for filename in os.listdir(app.config['IMAGE_FOLDER']) if filename.endswith(('.jpg', '.jpeg', '.png'))]
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

@app.route('/')
def index():
    # Choose a random image from the list
    random_image = random.choice(image_filenames)
    image_path = os.path.join(app.config['IMAGE_FOLDER'], random_image)
    greeting = get_greeting()
    return render_template('index.html', image_path=image_path, greeting=greeting)


if __name__ == '__main__':
    app.run(debug=True)
