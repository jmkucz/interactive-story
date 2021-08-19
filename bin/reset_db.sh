#!/bin/bash

# Stop on errors
# See https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -Eeuo pipefail

sqlite3 trapped/ApiTrapped/ApiTrapped/trapped.sqlite3 < sqlite/starting_data.sql