#!/bin/bash
# Script to start Expo web development server

# Navigate to frontend directory
cd "$(dirname "$0")"

echo "Starting Expo web development server on port 3000..."
echo ""
echo "The app will be available at:"
echo "  - http://localhost:3000"
echo "  - http://13.56.226.189:3000 (from external)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run web

