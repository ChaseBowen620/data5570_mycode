# Cloudflare Tunnel Authentication Guide

Follow these steps to authenticate your Cloudflare tunnel.

## Step-by-Step Authentication

### Step 1: Start the Login Process

Run this command in your terminal:

```bash
cloudflared tunnel login
```

You'll see output like this:
```
Please open the following URL and log in with your Cloudflare account:

https://dash.cloudflare.com/argotunnel?aud=...

Leave cloudflared running to download the cert automatically.
2025-11-06T01:34:12Z INF Waiting for login...
```

### Step 2: Open the URL in Your Browser

1. **Copy the URL** from the terminal output (it starts with `https://dash.cloudflare.com/argotunnel...`)

2. **Open the URL** in your web browser:
   - You can copy the URL from the terminal
   - Or if you have SSH access, you can use a browser on your local machine
   - The URL will expire after a few minutes, so act quickly

3. **Log in to Cloudflare**:
   - Enter your Cloudflare account email and password
   - If you're already logged in, you may be automatically redirected

### Step 3: Authorize the Tunnel

1. **Select your domain** (if you have multiple domains):
   - Choose the domain you want to use for the tunnel
   - If you don't have a domain yet, you can still use Cloudflare's free tunnel service

2. **Click "Authorize"** or "Allow" to grant permission:
   - This will allow cloudflared to create tunnels for your account
   - You'll see a success message

### Step 4: Verify Authentication

After authorizing, the terminal should show:
```
2025-11-06T01:34:12Z INF Waiting for login...
2025-11-06T01:34:45Z INF Successfully fetched Tunnel credentials
2025-11-06T01:34:45Z INF +--------------------------------------------------------------------------------------------+
2025-11-06T01:34:45Z INF |  Your tunnel credentials have been saved to: /home/ubuntu/.cloudflared/xxxxxxxxx.json  |
2025-11-06T01:34:45Z INF +--------------------------------------------------------------------------------------------+
```

If you see this, authentication was successful!

## Troubleshooting

### Can't Access the URL
- Make sure you copy the entire URL from the terminal
- The URL expires quickly - try running the command again if it's been more than a few minutes
- Check that your SSH connection allows opening URLs (if using SSH port forwarding)

### Already Authorized
If you've already authorized before, you might see:
```
You have successfully logged in.
```

This means you're already authenticated and can proceed to creating tunnels.

### Check Authentication Status
To verify you're logged in, you can check:
```bash
ls -la ~/.cloudflared/*.json
```

If you see credential files, authentication was successful.

## Next Steps

After authentication, you can:
1. Create a named tunnel (see next section)
2. Configure the tunnel
3. Start routing traffic

See the main setup guide for next steps.

