import subprocess
import webbrowser
import time

def start_flask_app():
    # Replace 'app.py' with the name of your Flask app file
    subprocess.Popen(["python", "app.py"])

def open_browser(url):
    webbrowser.open_new(url)

if __name__ == "__main__":
    # Replace this with the actual URL of your Flask app
    app_url = "http://127.0.0.1:5000"

    start_flask_app()

    # Give some time for the Flask server to start
    time.sleep(2)

    open_browser(app_url)
