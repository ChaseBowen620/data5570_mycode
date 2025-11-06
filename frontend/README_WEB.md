# Expo Web App - Quick Reference

## 🚀 Quick Start

### Development (with hot reload)
```bash
./start_web.sh
```
Opens at: http://localhost:3000

### Production (static build)
```bash
./serve_web.sh
```
Opens at: http://localhost:3000

## 📋 What's Configured

✅ Web dependencies installed (react-dom, react-native-web)  
✅ API URL set to EC2 backend: http://13.56.226.189:8000/api  
✅ AsyncStorage works on web (uses localStorage)  
✅ Navigation works on web  
✅ Responsive design for desktop/tablet/mobile  

## 🔧 Manual Commands

**Build static files:**
```bash
npx expo export:web
```

**Start dev server:**
```bash
npm run web
```

**Serve static build:**
```bash
cd web
python3 -m http.server 3000
```

## 📖 Full Documentation

See `WEB_DEPLOYMENT.md` for complete deployment guide.

