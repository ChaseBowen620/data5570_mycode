# EAS Hosting Deployment Guide

This guide will help you deploy your SideHUSTLE app to EAS Hosting.

## ✅ Completed Steps

1. **Configured app.json** - Added `"output": "single"` to web configuration
2. **Exported the app** - Successfully exported to `dist/` directory
3. **Installed eas-cli** - Added as a local dependency
4. **Verified login** - You're logged in as `chasecbowen`
5. **Created eas.json** - Configuration file is ready

## Quick Deploy (Recommended)

Run the deployment script:

```bash
cd /home/ubuntu/data5570_mycode/frontend
./deploy_to_eas.sh
```

This script will:
- Check your login status
- Export the app if needed
- Initialize EAS project (first time only - answer 'yes' when prompted)
- Deploy to EAS Hosting (choose a subdomain name when prompted)

## Manual Steps (Alternative)

### Step 1: Initialize EAS Project (First Time Only)

Run this command and answer **'yes'** when prompted:

```bash
cd /home/ubuntu/data5570_mycode/frontend
npx eas-cli init
```

When asked: "Would you like to create a project for @chasecbowen/sidehustle?"
- Answer: **yes**

### Step 2: Deploy to EAS Hosting

Once the project is initialized, run:

```bash
npx eas-cli deploy
```

When prompted:
- Choose a preview subdomain name (e.g., `sidehustle-preview` or `sidehustle-app`)
- The deployment will upload your files and provide a URL

### Step 3: Re-deploy After Changes

Whenever you make changes to your app:

1. **Export the app again:**
   ```bash
   npx expo export --platform web
   ```

2. **Deploy again:**
   ```bash
   npx eas deploy
   ```

## Important Notes

- The exported app is in the `dist/` directory
- Your API URL is configured in `app.json` as `http://13.56.226.189:8000/api`
- Make sure your backend server is running and accessible at that URL
- The deployed app will be a static single-page application

## Troubleshooting

### If deployment fails:
- Make sure you're logged in: `npx eas-cli whoami`
- Check that the `dist/` directory exists and contains files
- Verify your Expo account has access to EAS services

### To check deployment status:
```bash
npx eas build:list
```

## Configuration

Current configuration in `app.json`:
- **Output mode:** `single` (single-page app)
- **Bundler:** `metro`
- **API URL:** `http://13.56.226.189:8000/api`

