# Setup and Running Guide

This guide will help you run the SideHUSTLE app with the backend on EC2 and frontend on Expo.

## Prerequisites

✅ **Already Installed:**
- Python 3.12.3
- Node.js v20.19.5
- npm 10.8.2
- uv (Python package manager)
- Virtual environment created with uv

## Backend Setup (Django on EC2)

### 1. Navigate to Backend Directory
```bash
cd /home/ubuntu/data5570_mycode/backend
```

### 2. Activate Virtual Environment
```bash
export PATH="$HOME/.local/bin:$PATH"
source .venv/bin/activate
```

### 3. Start the Backend Server

**Option A: Use the startup script (Recommended)**
```bash
./start_server.sh
```

**Option B: Manual start**
```bash
export PATH="$HOME/.local/bin:$PATH"
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

The backend will be available at:
- **Local**: http://localhost:8000
- **EC2 Public IP**: http://13.56.226.189:8000
- **API Endpoints**: http://13.56.226.189:8000/api/

### 4. Verify Backend is Running

Open in a browser or use curl:
```bash
curl http://localhost:8000/api/posts/published/
```

You should see a JSON response (may be empty array `[]` if no posts exist).

## Frontend Setup (Expo)

### 1. Navigate to Frontend Directory
```bash
cd /home/ubuntu/data5570_mycode/frontend
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Expo Development Server

**Option A: Use the startup script (Recommended)**
```bash
./start_expo.sh
```

**Option B: Manual start**
```bash
npm start
```

### 4. Access the App

After running `npm start`, you'll see a QR code and options:

**For Physical Device:**
1. Install **Expo Go** app on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

**For Simulator/Emulator:**
- Press `i` for iOS Simulator (requires macOS)
- Press `a` for Android Emulator (requires Android Studio)
- Press `w` for web browser

**For Web (Tunnel Mode):**
If you need to access from a different network, press `s` to switch to tunnel mode.

## Running Both Servers

### Terminal 1: Backend
```bash
cd /home/ubuntu/data5570_mycode/backend
./start_server.sh
```

### Terminal 2: Frontend
```bash
cd /home/ubuntu/data5570_mycode/frontend
./start_expo.sh
```

## Configuration

### Backend Configuration
- **File**: `backend/sideHUSTLE/settings.py`
- **ALLOWED_HOSTS**: Currently set to allow all hosts (`'*'`) for development
- **Database**: SQLite at `backend/db.sqlite3`
- **Port**: 8000

### Frontend Configuration
- **File**: `frontend/app.json`
- **API URL**: Configured to `http://13.56.226.189:8000/api`
- **Port**: Expo uses port 19000 (default) or 8081

## Important Notes

### EC2 Security Group
Make sure your EC2 security group allows inbound traffic on:
- **Port 8000** (Django backend)
- **Port 19000** (Expo default - if using tunnel mode)

### Changing the API URL
If your EC2 IP changes, update `frontend/app.json`:
```json
"extra": {
  "apiUrl": "http://YOUR_EC2_IP:8000/api"
}
```

### Database Migrations
If you need to reset or create new migrations:
```bash
cd /home/ubuntu/data5570_mycode/backend
source .venv/bin/activate
python manage.py makemigrations
python manage.py migrate
```

### Creating a Superuser (Admin)
```bash
cd /home/ubuntu/data5570_mycode/backend
source .venv/bin/activate
python manage.py createsuperuser
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

**Module not found:**
```bash
# Make sure virtual environment is activated
source .venv/bin/activate
# Reinstall dependencies
uv pip install -r requirements.txt
```

### Frontend Issues

**Expo not starting:**
```bash
# Clear cache
npm start -- --clear
```

**Cannot connect to backend:**
- Check if backend is running
- Verify API URL in `app.json` matches your EC2 IP
- Check EC2 security group allows port 8000

**Network issues:**
- Use tunnel mode: Press `s` in Expo
- Or use your local network IP instead of EC2 IP for local testing

## Testing the Setup

1. **Test Backend API:**
   ```bash
   curl http://localhost:8000/api/posts/published/
   ```

2. **Test Frontend Connection:**
   - Open Expo app
   - Try to register/login
   - Check browser console or Expo logs for API errors

3. **Create Test Data:**
   - Register a new user in the app
   - Create a post
   - Verify it appears in the "Discover" tab

## Production Deployment

For production:
1. **Backend**: Use Gunicorn instead of Django dev server
2. **Frontend**: Build with EAS (Expo Application Services)
3. **Database**: Consider migrating to PostgreSQL (AWS RDS)
4. **Security**: Remove `'*'` from ALLOWED_HOSTS and use specific domain

## Quick Commands Reference

```bash
# Backend
cd backend && source .venv/bin/activate && python manage.py runserver 0.0.0.0:8000

# Frontend
cd frontend && npm start

# Both (in separate terminals)
./backend/start_server.sh    # Terminal 1
./frontend/start_expo.sh     # Terminal 2
```

