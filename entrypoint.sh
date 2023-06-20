#!/bin/bash
set -e

node fb_scrapper.js "$@"

# Execute any command passed to the container as arguments
exec bash