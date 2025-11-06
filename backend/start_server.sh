#!/bin/bash
# Script to start Django backend server

# Add uv to PATH
export PATH="$HOME/.local/bin:$PATH"

# Navigate to backend directory
cd "$(dirname "$0")"

# Activate virtual environment
source .venv/bin/activate

# Run migrations (if needed)
echo "Running migrations..."
python manage.py migrate

# Start Django development server
echo "Starting Django server on http://0.0.0.0:8000..."
echo "Press Ctrl+C to stop the server"
python manage.py runserver 0.0.0.0:8000


