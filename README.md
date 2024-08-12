# DiscoverUni Widget

[![Build Status](https://dev.azure.com/ofsbeta/discoverUni/_apis/build/status/dev/dev-widget-server-build?branchName=develop)](https://dev.azure.com/ofsbeta/discoverUni/_build/latest?definitionId=43&branchName=develop)
[![Build Status](https://dev.azure.com/ofsbeta/discoverUni/_apis/build/status/prod/prod-widget-server-build?branchName=develop)](https://dev.azure.com/ofsbeta/discoverUni/_build/latest?definitionId=46&branchName=master)

# Setup

## Docker

```
# cp docker-compose.yml.example docker-compose.yml
# vim docker-compose.yml
...
WIDGETAPIKEY: "..."
WIDGETAPIHOST: "..."
ROOT_DOMAIN: "..."
...
# make install
# make dev
```

## Accessing the Site

```
# curl -i localhost:8001/Widget/10007163/U-Q300/horizontal/small/en-GB
HTTP/1.1 200 OK
...
```

# Testing the widget

There is a test server located in an internal repository. To test the widget, you will need to clone the repository and follow the instructions in the README.

The test server repository is named: `ofs-flask-widget-server-testing-app` and the README can be found in the root of this repository.


