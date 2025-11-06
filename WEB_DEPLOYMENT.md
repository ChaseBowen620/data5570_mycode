# Expo Web App Deployment Guide

This guide explains how to deploy and run the SideHUSTLE frontend as a web application.

## Quick Start

### Option 1: Development Server (Hot Reload)

For development with live reloading:

```bash
cd /home/ubuntu/data5570_mycode/frontend
./start_web.sh
```

The app will be available at **http://localhost:3000**

### Option 2: Production Build (Static Site)

For production deployment:

```bash
cd /home/ubuntu/data5570_mycode/frontend
./serve_web.sh
```

The app will be available at **http://localhost:3000** (or your EC2 IP:3000)

## Manual Steps

### Development Mode

1. **Start the web development server:**
   ```bash
   cd /home/ubuntu/data5570_mycode/frontend
   npm run web
   ```
   
   Or use the script:
   ```bash
   ./start_web.sh
   ```

2. **Access the app:**
   - Open browser: http://localhost:3000
   - Or from external: http://13.56.226.189:3000

### Production Build

1. **Build the static web app:**
   ```bash
   cd /home/ubuntu/data5570_mycode/frontend
   npx expo export:web
   ```
   
   This creates a `web/` directory with static files.

2. **Serve the static files:**

   **Option A: Using serve (recommended)**
   ```bash
   npm install -g serve
   serve -s web -l 3000
   ```

   **Option B: Using Python HTTP server**
   ```bash
   cd web
   python3 -m http.server 3000
   ```

   **Option C: Using Node.js http-server**
   ```bash
   npm install -g http-server
   cd web
   http-server -p 3000
   ```

3. **Access the app:**
   - Local: http://localhost:3000
   - External: http://13.56.226.189:3000

## Running Both Backend and Frontend

### Terminal 1: Backend
```bash
cd /home/ubuntu/data5570_mycode/backend
./start_server.sh
```

### Terminal 2: Frontend Web (Development)
```bash
cd /home/ubuntu/data5570_mycode/frontend
./start_web.sh
```

### Terminal 2: Frontend Web (Production)
```bash
cd /home/ubuntu/data5570_mycode/frontend
./serve_web.sh
```

## Configuration

### API URL
The frontend is configured to connect to:
- **Backend API**: http://13.56.226.189:8000/api

This is set in `frontend/app.json`:
```json
"extra": {
  "apiUrl": "http://13.56.226.189:8000/api"
}
```

### EC2 Security Group
Make sure your EC2 security group allows:
- **Port 8000** - Django backend
- **Port 3000** - Web frontend (development and production)

## Web-Specific Features

### AsyncStorage
AsyncStorage works on web and uses browser localStorage under the hood.

### Navigation
React Navigation works on web with proper routing.

### Responsive Design
The app is responsive and works on desktop, tablet, and mobile browsers.

## Troubleshooting

### Build Errors

**"Module not found" errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

**Web build fails:**
```bash
# Make sure web dependencies are installed
npm install react-dom@18.2.0 react-native-web@^0.19.0 --legacy-peer-deps
```

### CORS Issues

If you see CORS errors, make sure:
1. Backend CORS is configured correctly in `backend/sideHUSTLE/settings.py`
2. `CORS_ALLOW_ALL_ORIGINS = True` is set for development

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### Cannot Connect to Backend

1. Verify backend is running: `curl http://localhost:8000/api/posts/published/`
2. Check API URL in `app.json` matches your EC2 IP
3. Verify security group allows port 8000

## Production Deployment Tips

### Using Nginx (Recommended for Production)

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create Nginx config:**
   ```bash
   sudo nano /etc/nginx/sites-available/sidehustle
   ```

3. **Add configuration:**
   ```nginx
   server {
       listen 80;
       server_name 13.56.226.189;

       root /home/ubuntu/data5570_mycode/frontend/web;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable and start:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/sidehustle /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Using PM2 (Process Manager)

1. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

2. **Start with PM2:**
   ```bash
   cd /home/ubuntu/data5570_mycode/frontend/web
   pm2 serve . 3000 --spa
   pm2 save
   pm2 startup
   ```

## File Structure

After building, you'll have:
```
frontend/
├── web/              # Built static files (after export:web)
│   ├── index.html
│   ├── _expo/
│   └── static/
├── start_web.sh      # Development server
├── serve_web.sh      # Production build & serve
└── build_web.sh      # Just build, don't serve
```

## Testing

1. **Test backend connection:**
   ```bash
   curl http://localhost:8000/api/posts/published/
   ```

2. **Test frontend:**
   - Open browser developer tools (F12)
   - Check Network tab for API calls
   - Check Console for any errors

3. **Test full flow:**
   - Register a new user
   - Login
   - Create a post
   - View published posts

## Next Steps

- [ ] Set up domain name (optional)
- [ ] Configure SSL/HTTPS (Let's Encrypt)
- [ ] Set up Nginx reverse proxy
- [ ] Configure proper CORS for production
- [ ] Set up CI/CD pipeline

