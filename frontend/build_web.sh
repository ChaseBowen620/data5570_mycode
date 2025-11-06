#!/bin/bash
# Script to build and serve Expo web app

# Navigate to frontend directory
cd "$(dirname "$0")"

echo "Building Expo web app..."
npx expo export:web

echo ""
echo "Web build complete! Files are in the 'web' directory."
echo ""
echo "To serve the web app, you can:"
echo "1. Use a simple HTTP server:"
echo "   cd web && python3 -m http.server 3000"
echo ""
echo "2. Or use npx serve:"
echo "   npx serve web -p 3000"
echo ""


