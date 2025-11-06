# Port Configuration

## Configured Ports

Your EC2 instance has the following ports open:

### Backend (Django)
- **Port:** 8000
- **URL:** http://13.56.226.189:8000
- **API:** http://13.56.226.189:8000/api

### Frontend (Expo Web)
- **Port:** 3000
- **URL:** http://13.56.226.189:3000

## Configuration Files Updated

✅ **Frontend:**
- `package.json` - Web script uses `--port 3000`
- `start_web.sh` - Updated to show port 3000
- `serve_web.sh` - Updated to serve on port 3000

✅ **Backend:**
- `settings.py` - CORS allows port 3000
- `start_server.sh` - Runs on port 8000

## Quick Start

### Terminal 1: Backend (Port 8000)
```bash
cd /home/ubuntu/data5570_mycode/backend
./start_server.sh
```

### Terminal 2: Frontend (Port 3000)
```bash
cd /home/ubuntu/data5570_mycode/frontend
./start_web.sh
```

## Access URLs

- **Frontend:** http://13.56.226.189:3000
- **Backend API:** http://13.56.226.189:8000/api

## Security Group

Make sure your EC2 security group has:
- **Inbound Rule:** Port 8000 (TCP) - Backend
- **Inbound Rule:** Port 3000 (TCP) - Frontend

## Testing

Test backend:
```bash
curl http://localhost:8000/api/posts/published/
```

Test frontend:
Open browser: http://13.56.226.189:3000


