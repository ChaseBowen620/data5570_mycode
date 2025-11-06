# Quick Start Guide

## 🚀 Start Backend (Terminal 1)

```bash
cd /home/ubuntu/data5570_mycode/backend
./start_server.sh
```

Backend will run at: **http://13.56.226.189:8000**

## 🌐 Start Frontend Web App (Terminal 2)

### Development Mode (Hot Reload)
```bash
cd /home/ubuntu/data5570_mycode/frontend
./start_web.sh
```
App will be at: **http://localhost:3000** or **http://13.56.226.189:3000**

### Production Mode (Static Build)
```bash
cd /home/ubuntu/data5570_mycode/frontend
./serve_web.sh
```
App will be at: **http://localhost:3000** or **http://13.56.226.189:3000**

## 📋 What's Already Set Up

✅ Virtual environment created with `uv`  
✅ Backend dependencies installed  
✅ Frontend dependencies installed  
✅ Database migrations applied  
✅ API URL configured to EC2 IP  
✅ Startup scripts created  

## 🔧 Important Configuration

- **Backend IP**: 13.56.226.189:8000
- **Frontend API URL**: Configured in `frontend/app.json`
- **Database**: SQLite at `backend/db.sqlite3`

## 📖 Full Documentation

See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.

