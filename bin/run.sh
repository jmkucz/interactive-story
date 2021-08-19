#!/bin/bash

# Stop on errors
# See https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -Eeuo pipefail

#set flask stuff
export FLASK_DEBUG=True
export FLASK_APP=trapped
export TRAPPED_SETTINGS=config.py

#run
flask run --host 0.0.0.0 --port 3000