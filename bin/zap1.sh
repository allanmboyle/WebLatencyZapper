#!/usr/bin/bash

#
# Test runner for server 1
#
export ZAP_PORT=8000
export ZAP_NEXT_SERVER_NAME=localhost
export ZAP_NEXT_SERVER_PORT=8010
export ZAP_GA_TOKEN=UA-33225197-1

node zapapp.js

