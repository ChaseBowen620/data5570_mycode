#!/bin/bash
# Deploy SideHUSTLE app to EAS Hosting
# This script will guide you through the deployment process

set -e

echo "=========================================="
echo "Deploying SideHUSTLE to EAS Hosting"
echo "=========================================="
echo ""

# Check if logged in
echo "Checking login status..."
if npx eas-cli whoami > /dev/null 2>&1; then
    USER=$(npx eas-cli whoami)
    echo "✅ Logged in as: $USER"
else
    echo "❌ Not logged in. Please run: npx eas-cli login"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found. Exporting app..."
    npx expo export --platform web
    echo "✅ Export complete"
else
    echo "✅ dist directory found"
fi

# Check if EAS project is configured (check for .eas/project.json or app.json with owner field)
if [ ! -d ".eas" ]; then
    echo ""
    echo "📋 Initializing EAS project..."
    echo "When prompted, answer 'yes' to create the project"
    npx eas-cli init
else
    echo "✅ EAS project already configured"
fi

echo ""
echo "🚀 Deploying to EAS Hosting..."
echo "When prompted, choose a preview subdomain name (e.g., 'sidehustle-preview')"
npx eas-cli deploy

echo ""
echo "=========================================="
echo "✅ Deployment complete!"
echo "Check the URL provided above to view your app"
echo "=========================================="

