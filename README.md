# DiscoverUni Widget

[![Build Status](https://dev.azure.com/ofsbeta/discoverUni/_apis/build/status/dev/dev-widget-server-build?branchName=develop)](https://dev.azure.com/ofsbeta/discoverUni/_build/latest?definitionId=43&branchName=develop)
[![Build Status](https://dev.azure.com/ofsbeta/discoverUni/_apis/build/status/prod/prod-widget-server-build?branchName=develop)](https://dev.azure.com/ofsbeta/discoverUni/_build/latest?definitionId=46&branchName=master)

# Setup

## Docker

```
# make install
# make dev
```

## Accessing the Site

```
# curl -i localhost:8001/Widget/10007163/U-Q300/horizontal/small/en-GB
HTTP/1.1 200 OK
...
```

# Loading an example widget

Drag'n'drop `test.html` into your browser. It should load up a test widget.
