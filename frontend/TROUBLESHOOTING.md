# Troubleshooting Guide

## File Watcher Limit Error (ENOSPC)

**Error:** `ENOSPC: System limit for number of file watchers reached`

**Solution:** Already fixed! The limit has been increased to 524288.

If you see this error again:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Expo Router Error

**Error:** `static and server rendering requires the expo-router package`

**Solution:** This is resolved by removing `"output": "static"` from app.json. The web config now only has `"bundler": "metro"`.

## Missing Assets Error

**Error:** `ENOENT: no such file or directory, open './assets/favicon.png'`

**Solution:** Assets folder created. If you still see this, make sure the assets folder exists:
```bash
mkdir -p assets
touch assets/favicon.png assets/icon.png assets/splash.png assets/adaptive-icon.png
```

## Port Already in Use

**Error:** Port 8081 or 19006 already in use

**Solution:**
```bash
# Find process using port
lsof -i :8081
lsof -i :19006

# Kill the process
kill -9 <PID>

# Or use a different port
EXPO_WEB_PORT=3000 npm run web
```

## Cannot Connect to Backend

**Issue:** Frontend can't reach backend API

**Solutions:**
1. Make sure backend is running: `curl http://localhost:8000/api/posts/published/`
2. Check API URL in `app.json` matches your EC2 IP
3. Verify EC2 security group allows port 8000
4. Check CORS settings in Django: `CORS_ALLOW_ALL_ORIGINS = True`

## Metro Bundler Not Starting

**Issue:** Metro bundler hangs or doesn't start

**Solutions:**
```bash
# Clear cache
npm start -- --clear

# Reset Metro cache
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

## Web Build Fails

**Issue:** `npx expo export:web` fails

**Solutions:**
1. Make sure web dependencies are installed:
   ```bash
   npm install react-dom@18.2.0 react-native-web@^0.19.0 --legacy-peer-deps
   ```

2. Clear cache and rebuild:
   ```bash
   rm -rf web .expo
   npx expo export:web
   ```

## Version Mismatch Warnings

**Warning:** Package versions don't match Expo version

**Solution:** Already fixed! Updated packages to compatible versions:
- `@expo/metro-runtime@~3.1.3`
- `react-native@0.73.6`

## CORS Errors in Browser

**Error:** CORS policy blocked

**Solutions:**
1. Backend CORS is configured in `backend/sideHUSTLE/settings.py`
2. Make sure `CORS_ALLOW_ALL_ORIGINS = True` for development
3. For production, add your domain to `CORS_ALLOWED_ORIGINS`

## AsyncStorage Not Working on Web

**Issue:** Data not persisting on web

**Solution:** AsyncStorage works on web automatically (uses localStorage). If issues persist:
```bash
npm install @react-native-async-storage/async-storage-web --legacy-peer-deps
```

## Navigation Not Working on Web

**Issue:** Navigation doesn't work in browser

**Solution:** React Navigation works on web. Make sure you're using:
- `@react-navigation/native`
- `@react-navigation/stack` or `@react-navigation/bottom-tabs`

These are already installed and configured.

## Still Having Issues?

1. Check the logs carefully - Expo provides detailed error messages
2. Clear all caches: `rm -rf node_modules/.cache .expo web`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check Expo documentation: https://docs.expo.dev/


