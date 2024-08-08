from flask import Flask
from flask import render_template
from decouple import config

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template(
        'index.html',
        url_to_test=config("WIDGET_SERVER_URL", default="http://0.0.0.0:8001/")
    )


if __name__ == '__main__':
    app.run()
