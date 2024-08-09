# Testing-server

A simple flask server to test the widget server on a html page.

## Installation

1. Install the dependencies
2. Run the server

```bash
cd testing-server
pip install -r requirements.txt
python app.py
```

## Usage

The server will be running on `http://127.0.0.1:5000/`

The server requires a single Environment variable `WIDGET_SERVER_URL` which should be the url of the widget server.
If the variable is not set then itwill default to `http://0.0.0.0:8001/`. Update accordingly to test the page against 
different widget servers.

