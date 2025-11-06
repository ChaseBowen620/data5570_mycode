#!/bin/bash
# Script to start Django backend server with Cloudflare tunnel

# Add uv to PATH
export PATH="$HOME/.local/bin:$PATH"

# Navigate to backend directory
cd "$(dirname "$0")"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Starting Django + Cloudflare Tunnel${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if Django server is already running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port 8000 is already in use${NC}"
    echo "Stopping existing Django server..."
    pkill -f "python.*manage.py.*runserver"
    sleep 2
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Run migrations (if needed)
echo "Running migrations..."
python manage.py migrate --noinput

# Start Django server in background
echo ""
echo -e "${GREEN}Starting Django server on http://localhost:8000...${NC}"
python manage.py runserver 0.0.0.0:8000 > /tmp/django_server.log 2>&1 &
DJANGO_PID=$!

# Wait a moment for Django to start
sleep 3

# Check if Django started successfully
if ! kill -0 $DJANGO_PID 2>/dev/null; then
    echo -e "${YELLOW}❌ Django server failed to start. Check logs:${NC}"
    cat /tmp/django_server.log
    exit 1
fi

echo -e "${GREEN}✅ Django server is running (PID: $DJANGO_PID)${NC}"
echo ""
echo -e "${GREEN}Starting Cloudflare tunnel...${NC}"
echo -e "${YELLOW}This will provide an HTTPS URL for your backend${NC}"
echo ""
echo "Press Ctrl+C to stop both the server and tunnel"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping Django server and tunnel...${NC}"
    kill $DJANGO_PID 2>/dev/null
    pkill -f "cloudflared tunnel" 2>/dev/null
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Start Cloudflare tunnel (using temporary tunnel mode - no authentication needed)
# Note: Warnings about ICMP proxy and ping_group_range can be safely ignored
echo -e "${YELLOW}Note: ICMP proxy warnings can be safely ignored${NC}"
echo ""
cloudflared tunnel --url http://localhost:8000

# If tunnel exits, cleanup
cleanup

