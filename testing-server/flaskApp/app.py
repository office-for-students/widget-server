from flask_cors import CORS
from flask import Flask
from flask import render_template
from decouple import config

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():  # put application's code here
    return render_template(
        'index.html',
        url_to_test=config("WIDGET_SERVER_URL")
    )


if __name__ == '__main__':
    app.run(debug=config("FLASK_DEBUG", default=False))
