#!/bin/bash
# Script to start Expo development server

# Navigate to frontend directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start Expo
echo "Starting Expo development server..."
echo "Press Ctrl+C to stop the server"
npm start


