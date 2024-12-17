#!/bin/bash
echo "Starting Building the project"
sleep 2

# Build Tailwind CSS
npx tailwindcss -i ./src/input.css -o ./src/output.css
echo "Finished Building CSS"
sleep 2

# Clean and prepare dist directory
rm -rf ./dist
mkdir -p ./dist/css ./dist/script ./dist/readme

# Copy files
cp ./src/index.html ./dist/
echo "Done, Moving index.html"

cp ./src/output.css ./dist/css/
echo "Done, Moving CSS"

cp ./src/script.js ./dist/script/
echo "Done, Moving script"

cp ./src/readme.md ./dist/readme/
echo "Done, Moving readme"