#!/bin/bash
echo "Building server with forced compilation..."
cd "$(dirname "$0")"
./node_modules/.bin/tsc --skipLibCheck --noEmitOnError false
