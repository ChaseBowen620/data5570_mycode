# Cloudflare Tunnel Setup Guide

This guide will help you set up a Cloudflare tunnel to expose your Django backend over HTTPS.

## ✅ Completed Steps

1. **Installed cloudflared** - The tool is now installed on your EC2 instance

## Next Steps

### Step 1: Create a Cloudflare Account

If you don't have a Cloudflare account yet:

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a free account (no credit card required)
3. Complete the signup process

### Step 2: Quick Start (Temporary Tunnel)

For a quick test, you can use a temporary tunnel. This is useful for testing but the URL changes each time.

**Start your Django server first:**
```bash
cd /home/ubuntu/data5570_mycode/backend
./start_server.sh
```

**In another terminal, start the tunnel:**
```bash
cloudflared tunnel --url http://localhost:8000
```

This will give you a URL like `https://xxxx-xxxx-xxxx.trycloudflare.com` that you can use to access your backend.

### Step 3: Create a Named Tunnel (Recommended for Production)

For a permanent tunnel with a stable URL:

1. **Login to Cloudflare:**
   ```bash
   cloudflared tunnel login
   ```
   This will open a browser window for authentication.

2. **Create a named tunnel:**
   ```bash
   cloudflared tunnel create sidehustle-backend
   ```

3. **Create a configuration file:**
   ```bash
   mkdir -p ~/.cloudflared
   ```
   
   Create `~/.cloudflared/config.yml`:
   ```yaml
   tunnel: <your-tunnel-id>
   credentials-file: /home/ubuntu/.cloudflared/<tunnel-id>.json
   
   ingress:
     - hostname: your-domain.com
       service: http://localhost:8000
     - service: http_status:404
   ```

4. **Run the tunnel:**
   ```bash
   cloudflared tunnel run sidehustle-backend
   ```

### Step 4: Use the Script (Easiest Method)

We've created a helper script for you:

```bash
cd /home/ubuntu/data5570_mycode/backend
./start_with_tunnel.sh
```

This script will:
- Start the Django server
- Start a Cloudflare tunnel pointing to it
- Show you the public HTTPS URL

## Updating Your Frontend Configuration

Once you have your Cloudflare tunnel URL, update your frontend's API URL:

1. **For temporary tunnels**, update `app.json`:
   ```json
   "extra": {
     "apiUrl": "https://your-tunnel-url.trycloudflare.com/api"
   }
   ```

2. **For named tunnels**, you can use your custom domain or the tunnel URL.

## Managing the Tunnel

### Start Tunnel (Simple Method)
```bash
# Make sure Django is running first
cd /home/ubuntu/data5570_mycode/backend
export PATH="$HOME/.local/bin:$PATH"
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000 &
cloudflared tunnel --url http://localhost:8000
```

### Stop Tunnel
Press `Ctrl+C` in the terminal running the tunnel.

### Check Tunnel Status
```bash
cloudflared tunnel list
```

## Troubleshooting

### Tunnel not connecting
- Make sure your Django server is running on port 8000
- Check that port 8000 is not blocked by firewall
- Verify cloudflared is installed: `cloudflared --version`

### Can't access the backend
- Make sure Django is configured to accept connections from 0.0.0.0 (not just localhost)
- Check that CORS is properly configured in Django settings
- Verify the tunnel URL is correct in your frontend configuration

### Port already in use
If port 8000 is already in use, you can:
- Stop the existing server: `pkill -f "python.*manage.py.*runserver"`
- Or use a different port and update the tunnel command

## Security Notes

- Temporary tunnels are great for testing but URLs change each time
- Named tunnels are better for production as they provide stable URLs
- All traffic is encrypted through Cloudflare
- Your Django server remains only accessible on localhost (more secure)


