#!/bin/bash
# Script to build and serve the Expo web app as a static site

# Navigate to frontend directory
cd "$(dirname "$0")"

echo "Building Expo web app for production..."
echo ""

# Build the web app
npx expo export:web

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful! Starting web server on port 3000..."
    echo ""
    echo "The app will be available at:"
    echo "  - http://localhost:3000"
    echo "  - http://13.56.226.189:3000 (from external)"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Check if serve is available, if not install it
    if ! command -v serve &> /dev/null; then
        echo "Installing serve package..."
        npm install -g serve
    fi
    
    # Serve the web build
    serve -s web -l 3000
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

